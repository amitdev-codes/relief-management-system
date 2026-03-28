<?php

namespace App\Http\Requests\ReliefPrioritization;

use Illuminate\Foundation\Http\FormRequest;

class StoreReliefPrioritizationRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'name_np' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|integer'
        ];
    }
}