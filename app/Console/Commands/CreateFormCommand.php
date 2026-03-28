<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateFormCommand extends Command
{
    protected $signature = 'make:form {model}';
    protected $description = 'Create a form component based on model fillable fields';

    public function handle()
    {
        $modelName = $this->argument('model');
        $modelClass = "App\\Models\\{$modelName}";
        $model = new $modelClass();

        $fillables = $model->getFillable();
        $columns = DB::getSchemaBuilder()->getColumnListing($model->getTable());
        $columnTypes = [];

        foreach ($columns as $column) {
            if (in_array($column, $fillables)) {
                $type = DB::getSchemaBuilder()->getColumnType($model->getTable(), $column);
                $columnTypes[$column] = $this->mapColumnTypeToField($type);
            }
        }

        $this->generateFormComponent($modelName, $columnTypes);
        $this->info("Form component created successfully!");
    }

    private function mapColumnTypeToField($type)
    {
        return match($type) {
            'string' => ['component' => 'TextInput', 'type' => 'text'],
            'integer' => ['component' => 'TextInput', 'type' => 'number'],
            'boolean' => ['component' => 'StatusSwitch', 'type' => 'switch'],
            'date' => ['component' => 'TextInput', 'type' => 'date'],
            'datetime' => ['component' => 'TextInput', 'type' => 'datetime-local'],
            'text' => ['component' => 'TextInput', 'type' => 'text'],
            'password' => ['component' => 'PasswordInput', 'type' => 'password'],
            'phone' => ['component' => 'PhoneInput', 'type' => 'tel'],
            default => ['component' => 'TextInput', 'type' => 'text']
        };
    }

    private function generateFormComponent($modelName, $columnTypes)
    {
        $path = resource_path("js/Pages/Backend/{$modelName}");
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $template = $this->getFormTemplate($modelName, $columnTypes);
        file_put_contents("{$path}/CreateEdit.jsx", $template);
    }

    private function getFormTemplate($modelName, $columnTypes)
    {
        $defaultFormData = $this->generateDefaultFormData($columnTypes);
        $validations = $this->generateValidations($columnTypes);
        $fields = $this->generateFields($columnTypes);

        return <<<JSX
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DynamicFormModal from "@/Components/Mui/DynamicFormModalComponent";
import { TextInput } from "@/Components/Inputs/TextInput";
import { PhoneInput } from "@/Components/Inputs/PhoneInput";
import { PasswordInput } from "@/Components/Inputs/PasswordInput";
import { SearchableSelect } from "@/Components/Inputs/SearchableSelect";
import { StatusSwitch } from "@/Components/Inputs/StatusSwitch";
import { usePage } from "@inertiajs/react";

const CreateEdit = ({ open, onClose, mode, data, onSubmit }) => {
    const getDefaultFormData = () => ({
        $defaultFormData
    });

    const [formData, setFormData] = useState(getDefaultFormData());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode === "edit" && data) {
            setFormData({
                $defaultFormData
            });
        } else {
            setFormData(getDefaultFormData());
        }
    }, [mode, data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        $validations
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }
        const submitData = { ...formData };
        if (mode === "edit" && !submitData.password) {
            delete submitData.password;
        }
        onSubmit(submitData);
    };

    return (
        <DynamicFormModal
            open={open}
            onClose={onClose}
            formType="modal"
            mode={mode}
            title={mode === "create" ? "Create $modelName" : "Edit $modelName"}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                $fields
            </Grid>
        </DynamicFormModal>
    );
};

export default CreateEdit;
JSX;
    }

    private function generateDefaultFormData($columnTypes)
    {
        $defaults = [];
        foreach ($columnTypes as $column => $type) {
            $default = match($type['type']) {
                'switch' => 'false',
                'number' => '""',
                default => '""'
            };
            $defaults[] = "$column: $default";
        }
        return implode(",\n        ", $defaults);
    }

    private function generateValidations($columnTypes)
    {
        $validations = [];
        foreach ($columnTypes as $column => $type) {
            $validations[] = "if (!formData.$column) newErrors.$column = '" . Str::title(str_replace('_', ' ', $column)) . " is required.';";
            if ($type['type'] === 'tel') {
                $validations[] = "if (formData.$column && formData.$column.length !== 10) newErrors.$column = 'Must be exactly 10 digits.';";
            }
        }
        return implode("\n        ", $validations);
    }

    private function generateFields($columnTypes)
    {
        $fields = [];
        foreach ($columnTypes as $column => $type) {
            $label = Str::title(str_replace('_', ' ', $column));
            $field = match($type['component']) {
                'StatusSwitch' => $this->generateStatusSwitch($column, $label),
                'PasswordInput' => $this->generatePasswordInput($column, $label),
                'PhoneInput' => $this->generatePhoneInput($column, $label),
                default => $this->generateTextInput($column, $label, $type['type'])
            };
            $fields[] = $field;
        }
        return implode("\n                ", $fields);
    }

    private function generateTextInput($name, $label, $type)
    {
        return <<<JSX
<Grid item xs={12} sm={3}>
    <TextInput
        label="$label"
        name="$name"
        type="$type"
        required
        value={formData.$name}
        onChange={handleChange}
    />
</Grid>
JSX;
    }

    private function generatePasswordInput($name, $label)
    {
        return <<<JSX
<Grid item xs={12} sm={3}>
    <PasswordInput
        label="$label"
        name="$name"
        required={mode === "create"}
        value={formData.$name}
        onChange={handleChange}
    />
</Grid>
JSX;
    }

    private function generatePhoneInput($name, $label)
    {
        return <<<JSX
<Grid item xs={12} sm={3}>
    <PhoneInput
        label="$label"
        name="$name"
        type="tel"
        required
        value={formData.$name}
        onChange={handleChange}
    />
</Grid>
JSX;
    }

    private function generateStatusSwitch($name, $label)
    {
        return <<<JSX
<Grid item xs={12} sm={3}>
    <StatusSwitch
        label="$label"
        name="$name"
        checked={formData.$name}
        onChange={(e) => {
            setFormData(prev => ({
                ...prev,
                $name: e.target.checked,
            }));
        }}
    />
</Grid>
JSX;
    }
}
