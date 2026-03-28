<?php

namespace App\Http\Requests\ReliefPrioritization;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReliefPrioritizationRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'name_np' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|integer'
        ];
    }
}