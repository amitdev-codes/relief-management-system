<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HasRoles;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

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
            ['field' => 'email', 'headerName' => 'Email','flex' => 1, 'searchable' => true, 'type' => 'text'],
            ['field' => 'mobile_number', 'headerName' => 'Mobile No','flex' => 1, 'searchable' => true, 'type' => 'text'],
            ['field' => 'status', 'headerName' => 'Status','flex' => 1],
            ['field' => 'role', 'headerName' => 'Roles','flex' => 1]
        ];
    }

    public static function getSearchableColumns()
    {
        return ['name', 'email','mobile_number'];
    }
}
