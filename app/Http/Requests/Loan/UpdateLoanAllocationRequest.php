<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLoanAllocationRequest extends FormRequest
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
        // if ($this->has('user_id') && is_string($this->input('user_id'))) {
        //     $this->merge([
        //         'user_id' => json_decode($this->input('user_id'), true)
        //     ]);
        // }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $loanAllocationId = $this->route('loanAllocation');
        return [
            'user_id' => 'sometimes|required|exists:users,id',
            'loan_asked_date' => 'sometimes|required|date',
            'loan_asked_date_bs' => 'sometimes|required',
            'loan_provided_date_bs' => 'sometimes|required',
            'loan_provided_date' => 'sometimes|required|date',
            'loan_purpose_type_id' => 'sometimes|required|exists:mst_loan_purpose_types,id',
            'loan_asked_amount' => 'sometimes|required|numeric|min:0',
            'loan_allocated_amount' => 'sometimes|required|numeric|min:0',
            'loan_approved_amount' => 'sometimes|required|numeric|min:0',
            'loan_repayment_period' => 'sometimes|required|integer|min:1',
            'interest_rate' => 'sometimes|required|numeric|min:0',
            'remaining_amount' => 'sometimes|required|numeric|min:0',
            'fiscal_year_id'=>'nullable',
            'status'=>'nullable',
            'remarks' => 'nullable|string',
            'loan_educational_faculty_type_id' => 'nullable|exists:educational_loan_faculties,id',
        ];
    }
}
