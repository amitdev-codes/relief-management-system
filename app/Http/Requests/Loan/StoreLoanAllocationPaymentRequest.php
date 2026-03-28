<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanAllocationPaymentRequest extends FormRequest
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
            'fiscal_year_id' => 'required|exists:mst_fiscal_year,id',
            'loan_allocation_id' => 'required|exists:loan_allocations,id',
            'loan_distribution_date_bs' => 'required|date_format:Y-m-d',
            'loan_distribution_date' => 'nullable|date',
            'payment_source_id' => 'required|exists:mst_payment_sources,id',
            'receipt_no' => 'required|string|max:255',
            'installment_id' => 'required|exists:installments,id',
            'installment_amount' => 'required|numeric|min:0',
            'loan_description' => 'nullable|string',
            'interest_rate' => 'nullable',
        ];
    }
}
