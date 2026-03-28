<?php

namespace App\Http\Controllers\Admin\Loan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Loan\StorePayentReimbursementSectionRequest;
use App\Http\Requests\Loan\UpdatePayentReimbursementSectionRequest;
use App\Models\LoanAllocation;
use App\Models\PaymentReimbursementSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentReimbursementSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayentReimbursementSectionRequest $request)
    {
        DB::beginTransaction();
        try {
            $data=$request->validated();
            $data['palika_id']=config('app.palika_id');
            $paymentReimbursementSection = PaymentReimbursementSection::create($data);
            DB::commit();
            return redirect()->back()->with('success', 'Payment Reimbursement saved successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error($e->getMessage());
            return response()->json(['error' => 'An error occurred while saving the payment reimbursement'], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentReimbursementSection $paymentReimbursementSection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentReimbursementSection $paymentReimbursementSection)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePayentReimbursementSectionRequest $request, PaymentReimbursementSection $paymentReimbursementSection)
    {

        DB::beginTransaction();
        try {
            $data=$request->validated();
            $data['palika_id']=config('app.palika_id');
            $paymentReimbursementSection->fill($data);
            $paymentReimbursementSection->save();
            DB::commit();
            return redirect()->back()->with('success', 'Payment Reimbursement saved successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error($e->getMessage());
            return response()->json(['error' => 'An error occurred while saving the payment reimbursement'], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentReimbursementSection $paymentReimbursementSection)
    {
        $paymentReimbursementSection->delete();
        return redirect()->back()->with('success', 'ऋण विवरण अपडेट सफलतापुर्बक गरियो!');

    }

    public function fetchInstallmentAmount($loanAllocationId, $percentage, $installmentId)
    {
        // dd($loanAllocationId, $percentage, $installmentId = null);
        // Step 1: Find the Loan Allocation
        $loanAllocation = LoanAllocation::find($loanAllocationId);

        if (!$loanAllocation) {
            return response()->json(['error' => 'Loan allocation not found'], 404);
        }

        // Step 2: Calculate the installment amount based on the approved loan amount and percentage
        $amount = $loanAllocation->loan_approved_amount;
        $installmentAmount = round((($amount * $percentage) / 100), 2);

        // Step 3: Get all payments associated with this loan allocation
        $payments = $loanAllocation->payments;


        // Step 4: Initialize a flag for the installment match and the loan distribution date
        $installmentExists = false;
        $loanDistributionDate = null;

        // Step 5: Check if the installment_id exists in the payments
        foreach ($payments as $payment) {
            if (is_array($installmentId)) {
                // If multiple installment_ids are provided (array), check for existence
                if (in_array($payment->installment_id, $installmentId)) {
                    $installmentExists = true;
                    $loanDistributionDate = $payment->loan_distribution_date_bs;
                    break; // Stop once the match is found
                }
            } else {
                // If a single installment_id is provided, compare directly
                if ($payment->installment_id == $installmentId) {
                    $installmentExists = true;
                    $loanDistributionDate = $payment->loan_distribution_date_bs;
                    break; // Stop once the match is found
                }
            }
        }

        if(!$loanDistributionDate){
            $latestPayment = $loanAllocation->payments()->orderBy('installment_id', 'desc')->first();
            $loanDistributionDate=$latestPayment->loan_distribution_date_bs;

        }

        // dd($installmentAmount,$installmentExists,$loanDistributionDate);

        // Step 6: Return the installment amount and whether the installment exists
        return response()->json([
            'installment_amount' => $installmentAmount,
            'installment_exists' => $installmentExists,
            'loan_distribution_date_bs' => $loanDistributionDate,
        ]);
    }

}
