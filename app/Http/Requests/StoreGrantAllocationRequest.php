<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGrantAllocationRequest extends FormRequest
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
            'grant_asked_date' => 'required',
            'grant_id' => 'required',
            'grant_purpose_id' => 'required',
            'grant_business_type_id' => 'required',
            'grant_receipt' => 'required',
            'grant_quantity' => 'required',
            'file_uploads' => 'required|image|mimes:jpeg,png,jpg,pdf|max:2048',
            'remarks' => 'nullable',
        ];
    }
}
