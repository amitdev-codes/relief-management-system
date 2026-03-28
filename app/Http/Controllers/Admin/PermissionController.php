<?php

namespace App\Http\Controllers\Admin;

use App\Models\Permission;
use Illuminate\Http\Request;
use App\Services\ResponseService;
use App\Http\Controllers\Controller;
use App\Http\Controllers\BaseResourceController;
use App\Http\Requests\UserManagement\StorePermissionRequest;
use App\Http\Requests\UserManagement\UpdatePermissionRequest;

class PermissionController extends BaseResourceController
{
    public function __construct(protected ResponseService $responseService)
    {
        $this->resourceName = 'permissions';
        $this->abilityName = 'permissions';
        $this->routeName = 'admin.permissions';
        $this->model = Permission::class;
        $this->with = [];
        $this->formType = 'modal';
        parent::__construct($responseService);
    }
    protected function getFormPath()
    {
        return [];
    }
    protected function getAdditionalFormData()
    {
        return [];
    }


    /**
     * Show the form for creating a new resource.
     */
    protected function mapRecords($records)
    {
        return $records->map(function ($record) {
            return [
                'id' => $record->id,
                'name' => $record->name,
            ];
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        return $this->handleRequest($request, function () use ($request) {
            $validated = $request->validated();
            $name = $validated['name'];
            $permissions = [
                'view-' . $name,
                'create-' . $name,
                'update-' . $name,
                'delete-' . $name,
            ];
            foreach ($permissions as $permission) {
                Permission::create(['name' => $permission]);
            }
        });
    }

    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        return $this->handleRequest($request, function () use ($request, $permission) {
            $validated = $request->validated();
            $permission->update($validated);
        });
    }
}
