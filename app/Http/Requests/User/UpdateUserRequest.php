<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user),
            ],
            'mobile_number' => [
                'required',
                'string',
                'size:10', // Ensure exactly 10 characters
                'regex:/^[0-9]{10}$/', // Ensure only numeric digits
                Rule::unique('users')->ignore($this->user),
            ],
            'password' => 'nullable|string|min:8',
            'status' => 'nullable|boolean',
        ];
    }
}
