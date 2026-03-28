<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLoanClearanceRequest extends FormRequest
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
            'user_id' => 'required',
            'loan_activation_date' => 'required|date',
            'loan_clearance_date' => 'required|date',
            'loan_allocated_amount' => 'required|numeric|min:0',
            'loan_approved_amount' => 'required|numeric|min:0',
            'loan_purpose_type_id' => 'required|exists:mst_loan_purpose_types,id',
            'loan_educational_faculty_type_id' => 'nullable|exists:educational_loan_faculties,id',
            'remaining_loan_clearance_amount' => 'nullable|numeric|min:0',
            'loan_repayment_period' => 'required|integer|min:1',
            'loan_interest_rate' => 'required|numeric|min:0|max:100',
            'fiscal_year_id' => 'nullable|exists:mst_fiscal_year,id',
            'remarks' => 'nullable|string',
            'loan_status' => 'nullable',
            'multiple_file_uploads.*' => 'nullable|file|mimes:jpeg,png,jpg,pdf,txt|max:9048',
        ];
    }
}
