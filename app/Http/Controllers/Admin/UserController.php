<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Services\ResponseService;
use App\Traits\HandlesExceptions;
use App\Traits\BulkDeletableTrait;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Controllers\BaseResourceController;

class UserController extends BaseResourceController
{
    // use BulkDeletableTrait;
    use HandlesExceptions;

    public function __construct(protected ResponseService $responseService)
    {
        $this->resourceName = 'users';
        $this->abilityName = 'users';
        $this->routeName = 'admin.users';
        $this->model = User::class;
        $this->with = ['roles'];
        $this->formType = 'modal';
        parent::__construct($responseService);
    }

    protected function mapRecords($records)
    {
        return $records->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'mobile_number' => $user->mobile_number,
                'created_at' => $user->created_at,
                'status' => $user->status ? 'Active' : 'Inactive',
                'role' => $user->roles->pluck('name')->implode(', '),
            ];
        });
    }

    /**
     * Get additional data for user index view
     */
    protected function getAdditionalIndexData()
    {
        return ['roles' => Role::get(['id','name'])->map(function($role){
            return [
                'value' => $role->id,
                'label' => $role->name,
            ];
        })  ];
    }
    protected function getFormPath()
    {
        return [];
    }
    protected function getAdditionalFormData()
    {
        return [];
    }

    public function store(StoreUserRequest $request)
    {
        return $this->handleRequest($request, function () use ($request) {
            $validated = $request->validated();
            $user = User::create($validated);
            $user->assignRole($request->input('roles'));
        });
    }

    public function update(UpdateUserRequest $request, User $user)
    {

        return $this->handleRequest($request, function () use ($request, $user) {
            $data = $request->validated();
            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->input('password'));
            } else {
                unset($data['password']);
            }
            $user->update($data);
            $user->syncRoles($request->input('role'));

        });
    }
}
