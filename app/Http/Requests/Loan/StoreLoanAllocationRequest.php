<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanAllocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected function prepareForValidation()
    {
        // $this->merge([
        //     'user_id' => (int) json_decode($this->user_id)[0],
        // ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'=>'required',
            'loan_asked_date_bs' => 'required',
            'loan_asked_date' => 'required',
            'loan_purpose_type_id' => 'required',
            'loan_asked_amount' => 'required',
            'loan_allocated_amount' => 'required',
            'loan_repayment_period' => 'required',
            'interest_rate' => 'required',
            'loan_educational_faculty_type_id' => 'required',
            'status'=>'nullable',
            'loan_provided_date_bs' => 'nullable',
            'loan_provided_date' => 'nullable',
            'remarks' => 'nullable',
            'loan_approved_amount' => 'nullable',
            'remaining_amount' => 'nullable',
            'fiscal_year_id'=>'nullable',
            'institute_name' => 'nullable',
        ];
    }
}
