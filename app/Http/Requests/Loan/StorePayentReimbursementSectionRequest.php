<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;

class StorePayentReimbursementSectionRequest extends FormRequest
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
           'user_id'=>'required',
           'loan_allocation_id'=>'required',
           'fiscal_year_id'=>'required',
           'installment_id'=>'required',
           'installment_percentage'=>'required',
           'installment_due_date_bs'=>'required',
           'installment_due_date'=>'required',
           'loan_approved_amount'=>'required',
           'installment_amount'=>'required',
           'loan_distribution_date_bs'=>'nullable',
           'loan_distribution_date'=>'nullable',
        ];
    }
}
