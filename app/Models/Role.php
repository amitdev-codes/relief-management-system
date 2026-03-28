<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'name_np', 'guard_name',
    ];

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
            ['field' => 'name', 'headerName' => 'Name', 'flex' => 0.5, 'searchable' => true, 'type' => 'text'],
            ['field' => 'permissions', 'headerName' => 'Permissions', 'flex' => 2, 'searchable' => true, 'type' => 'text'],
        ];
    }

    public static function getSearchableColumns()
    {
        return ['name', 'permissions'];
    }

}
