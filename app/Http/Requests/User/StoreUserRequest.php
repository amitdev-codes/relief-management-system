<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreUserRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // dd(Auth::user()->hasRole(['Admin', 'SuperAdmin']));
        $passwordRules = 'required|string|min:8';
        if (! Auth::user()->hasRole(['Admin', 'SuperAdmin'])) {
            $passwordRules .= '|confirmed';
        }

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'mobile_number' => [
                'required',
                'string',
                'size:10', // Ensure exactly 10 characters
                'regex:/^[0-9]{10}$/', // Ensure only numeric digits
                'unique:users,mobile_number', // Ensure uniqueness in the users table
            ],
            // 'roles' => 'nullable|exists:roles,id',
            'password' => $passwordRules,
            'status' => 'required|boolean',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (! request()->has('roles')) {
                $userRole = \Spatie\Permission\Models\Role::where('name', 'user')->first();
                if ($userRole) {
                    request()->merge(['roles' => [$userRole->id]]);
                }
            }
        });
    }
}
