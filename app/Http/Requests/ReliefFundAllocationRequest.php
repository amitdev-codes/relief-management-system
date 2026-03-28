<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReliefFundAllocationRequest extends FormRequest
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
            'incident_date' => 'required',
            'incident_description' => 'required',
            'file_uploads' => 'required|image|mimes:jpeg,png,jpg,pdf|max:2048',
            'applicant_ids' => 'required|json',
            'single_package' => 'required|json',
            'relief_type_id' => 'nullable',
            'relief_sub_category_id' => 'nullable',
            'quantity' => 'nullable',
            'package_type_id' => 'nullable',
            'single_package' => 'nullable',
            'amount' => 'nullable',
            'status' => 'nullable',
            'remarks' => 'nullable',
        ];
    }
}
