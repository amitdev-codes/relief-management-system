<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Traits\Searchable;
use Illuminate\Http\Request;
use App\Services\ResponseService;
use App\Traits\HandlesExceptions;
use App\Traits\BulkDeletableTrait;
use Illuminate\Support\Facades\DB;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\BaseResourceController;
use App\Http\Requests\UserManagement\StoreRoleRequest;
use App\Http\Requests\UserManagement\UpdateRoleRequest;

class RoleController extends BaseResourceController
{
    use BulkDeletableTrait, HandlesExceptions, Searchable;

    public function __construct(ResponseService $responseService)
    {
        $this->resourceName = 'roles';
        $this->abilityName = 'roles';
        $this->routeName = 'admin.roles';
        $this->model = Role::class;
        $this->with = ['permissions'];
        $this->formType = 'form';
        parent::__construct($responseService);
    }

    protected function getFormPath()
    {
        return 'Pages/Backend/UserManagement/Roles/CreateEdit';
    }
    protected function getAdditionalFormData()
    {
        return [
            'permissions' => Permission::get()
        ];
    }

    protected function mapRecords($records,$exportType=null)
    {
        return $records->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->implode(', '),
            ];
        });
    }



    public function store(StoreRoleRequest $request)
    {
        return $this->handleRequest($request, function () use ($request) {
            return DB::transaction(function () use ($request) {
                $validated = $request->validated();
                $role = Role::create($validated);
                if (! empty($validated['permissions'])) {
                    try {
                        $role->givePermissionTo($validated['permissions']);
                    } catch (\Exception $e) {
                        \Log::error('Error assigning permissions: '.$e->getMessage());
                        throw new \Exception('Failed to assign permissions');
                    }
                }

                return $role;
            });
        });
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        return $this->handleRequest($request, function () use ($request, $role) {
            return DB::transaction(function () use ($request, $role) {
                $validated = $request->validated();

                // Update role name
                $role->update([
                    'name' => $validated['name'],
                ]);

                // Sync permissions
                if (! empty($validated['permissions'])) {
                    $role->syncPermissions($validated['permissions']);
                } else {
                    $role->permissions()->detach();
                }

                return $role;
            });
        });
    }
}
