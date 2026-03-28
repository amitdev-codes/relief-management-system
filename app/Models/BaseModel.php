<?php

namespace App\Models;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BaseModel extends Model
{
    use HasFactory;

    public static function getTableColumns()
    {
        $columns = Schema::getColumnListing((new static)->getTable());
        $columns = array_diff($columns, ['created_at', 'updated_at','deleted_at','palika_id','id']);
        $columnsData = [];
        foreach ($columns as $column) {
            $columnsData[] = [
                'field' => $column,
                'headerName' => ucfirst(str_replace('_', ' ', $column)),
                'flex' => 1,
                'searchable' => true,
                'type' => 'text',
            ];
        }

        return $columnsData;
    }

    public static function getSearchableColumns()
    {
        return static::getTableColumns();
    }

    public function scopeFilter($query, $search)
    {
        return $query->where(function ($query) use ($search) {
            foreach (static::getSearchableColumns() as $column) {
                $query->orWhere($column, 'LIKE', "%{$search}%");
            }
        });
    }
}
