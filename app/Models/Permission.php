<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Permission as spatiePermission;

class Permission extends spatiePermission
{
    use HasFactory;

    public function scopeFilter($query, $search)
    {
        return $query->where(function ($query) use ($search) {
            foreach (static::getSearchableColumns() as $column) {
                $query->orWhere($column, 'LIKE', "%{$search}%");
            }
        });
    }

    public static function getTableColumns()
    {
        return [
            ['field' => 'name', 'headerName' => 'Name','flex' => 1, 'searchable' => true, 'type' => 'text'],
        ];
    }

    public static function getSearchableColumns()
    {
        return ['name'];
    }
}
