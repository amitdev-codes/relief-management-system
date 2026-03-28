<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class GenerateRequestClasses extends Command
{
    protected $signature = 'make:request-classes {model}';

    protected $description = 'Generate Store and Update request classes with dynamic validation rules';

    public function handle()
    {
        $modelName = $this->argument('model');
        $modelClass = "App\\Models\\{$modelName}";

        if (! class_exists($modelClass)) {
            $this->error("Model {$modelClass} does not exist.");

            return;
        }

        $model = new $modelClass;
        $table = $model->getTable();

        // Get column information using Schema facade
        $columns = Schema::getConnection()->getSchemaBuilder()->getColumnListing($table);
        $columnInfo = [];

        foreach ($columns as $column) {
            $type = Schema::getColumnType($table, $column);
            $columnInfo[] = (object) [
                'Field' => $column,
                'Type' => $type,
            ];
        }

        $fillable = $model->getFillable();

        $storeRequestPath = app_path("Http/Requests/{$modelName}/Store{$modelName}Request.php");
        $updateRequestPath = app_path("Http/Requests/{$modelName}/Update{$modelName}Request.php");

        File::ensureDirectoryExists(app_path("Http/Requests/{$modelName}"));

        $this->generateStoreRequest($columnInfo, $modelName, $fillable, $storeRequestPath);
        $this->generateUpdateRequest($columnInfo, $modelName, $fillable, $updateRequestPath);

        $this->info('Request classes generated successfully.');
    }

    protected function generateStoreRequest($columnInfo, $modelName, $fillable, $storeRequestPath)
    {
        $rules = $this->generateRulesFromColumns($columnInfo, $fillable, true);
        $storeRequestContent = $this->generateRequestClassContent($modelName, 'Store', $rules);
        File::put($storeRequestPath, $storeRequestContent);
    }

    protected function generateUpdateRequest($columnInfo, $modelName, $fillable, $updateRequestPath)
    {
        $rules = $this->generateRulesFromColumns($columnInfo, $fillable, false);
        $updateRequestContent = $this->generateRequestClassContent($modelName, 'Update', $rules);
        File::put($updateRequestPath, $updateRequestContent);
    }

    protected function generateRulesFromColumns($columnInfo, $fillable, $isStore)
    {
        $rules = [];
        foreach ($columnInfo as $column) {
            if (in_array($column->Field, $fillable)) {
                $rules[$column->Field] = $this->getValidationRule($column, $isStore);
            }
        }

        return $rules;
    }

    protected function getValidationRule($column, $isStore)
    {
        $required = $isStore ? 'required' : 'nullable';

        switch ($column->Type) {
            case 'varchar':
            case 'char':
            case 'text':
                return "{$required}|string|max:255"; // Adjust max length based on column type
            case 'tinyint':
            case 'smallint':
            case 'mediumint':
            case 'int':
            case 'bigint':
                return "{$required}|integer"; // Use integer for numeric types
            case 'decimal':
            case 'float':
                return "{$required}|numeric"; // For decimal/float types
            case 'boolean':
                return "{$required}|boolean"; // For boolean fields
            case 'datetime':
            case 'date':
                return "{$required}|date_format:Y-m-d"; // For date and datetime fields
            case 'json':
                return "{$required}|array"; // For JSON columns
            case 'enum': // For ENUM columns, assume we need to validate against the predefined options
                return "{$required}|in:".implode(',', $this->getEnumValues($column));
            default:
                return "{$required}|string";
        }
    }

    protected function generateRequestClassContent($modelName, $requestType, $rules)
    {
        $className = "{$requestType}{$modelName}Request";
        $rulesString = $this->formatRules($rules);

        return <<<PHP
<?php

namespace App\Http\Requests\\{$modelName};

use Illuminate\Foundation\Http\FormRequest;

class {$className} extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
{$rulesString}
        ];
    }
}
PHP;
    }

    protected function formatRules($rules)
    {
        $formattedRules = [];
        foreach ($rules as $column => $rule) {
            $formattedRules[] = "            '{$column}' => '{$rule}'";
        }

        return implode(",\n", $formattedRules);
    }

    protected function getEnumValues($column)
    {
        // Get enum values for the given column
        preg_match('/^enum\((.*)\)$/', $column->Type, $matches);
        if (isset($matches[1])) {
            return array_map(function ($value) {
                return trim($value, "'");
            }, explode(',', $matches[1]));
        }

        return [];
    }
}
