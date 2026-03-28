<?php

namespace App\Http\Controllers\Admin\Loan;

use App\Http\Controllers\Controller;
use App\Http\Requests\Loan\StoreLoanAllocationPaymentRequest;
use App\Http\Requests\Loan\UpdateLoanAllocationPaymentRequest;
use App\Models\LoanAllocation;
use App\Models\LoanPayment;
use App\Services\Loan\LoanAllocation\LoanCalculationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoanAllocationPaymentController extends Controller
{

    public function __construct(protected LoanCalculationService $loanCalculationService){

    }


    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLoanAllocationPaymentRequest $request)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validated();
            $validatedData['palika_id'] = config('app.palika_id');
            $loanAllocation=LoanAllocation::findOrFail($validatedData['loan_allocation_id']);
            $loan_amount=$loanAllocation->remaining_amount;
            $loanPayment = LoanPayment::create($validatedData);

            //update loan allocation
           $this->loanCalculationService->updateLoanAllocation($validatedData['loan_allocation_id'], $validatedData['installment_amount']);


            // Check for clearance
            $loanAllocation=LoanAllocation::findOrFail($validatedData['loan_allocation_id']);
            if ($loanAllocation->remaining_amount == 0) {
                $this->loanCalculationService->createLoanClearance($loanAllocation);
            }
            //dd('test',$loanAllocation,$loanAllocation->remaining_amount );
            DB::commit();
            return redirect()->route('loanAllocations.index')->with('success', 'Loan Payment saved successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['database' => 'A database error occurred: ' . $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoanAllocationPaymentRequest $request, LoanPayment $loanPayment)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validated();
            $loanAllocation=LoanAllocation::findOrFail($validatedData['loan_allocation_id']);
            $this->loanCalculationService->updateLoanAllocationAmount($validatedData['loan_allocation_id'], $validatedData['installment_amount'],$loanPayment->installment_amount);
            $loanPayment->fill($validatedData);
            $loanPayment->save();
            $loanAllocation=LoanAllocation::findOrFail($validatedData['loan_allocation_id']);
             if ($loanAllocation->remaining_amount == 0) {
                $this->loanCalculationService->createLoanClearance($loanAllocation);
             }
            DB::commit();
            return redirect()->route('loanAllocations.index')->with('success', 'Loan Payment updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['database' => 'A database error occurred: ' . $e->getMessage()]);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanPayment $loanPayment)
    {

        $this->loanCalculationService->revertLoanAllocation($loanPayment->loan_allocation_id,$loanPayment->installment_amount);
        $loanPayment->delete();

        return redirect()->back()->with('success', 'ऋण विवरण अपडेट सफलतापुर्बक गरियो!');
    }

}
