<?php

namespace App\Helpers;

use App\Models\Installment;
use App\Models\LoanAllocation;
use App\Models\LoanPayment;
use Carbon\Carbon;

class LoanInstallmentCalculator
{
    const INTEREST_RATE = 0.05; // 5% interest rate
    const FIRST_INSTALLMENT_PERCENTAGE = 0.25; // 25% of total amount for first installment

    public function calculateInstallment($userId, $installmentId, $loanAllocationId)
    {
        $loanAllocation = LoanAllocation::findOrFail($loanAllocationId);
        // Condition 1: Check if remaining amount is zero
        if ($loanAllocation->remaining_amount != 0) {
            return ['error' => 'Your loan payments from bank have not been completed.', 'status' => 400];
        }
        $loanPayments = LoanPayment::where('loan_allocation_id', $loanAllocationId)->orderBy('installment_id')->get();
        $loanPaymentsCount = $loanPayments->count();
        if ($loanPaymentsCount > 1) {
            $currentInstallment = $loanPayments->firstWhere('installment_id', $installmentId);
        } else {
            $currentInstallment = $loanPaymentsCount === 1? $loanPayments->first(): null; // No payments found
        }

        if (!$currentInstallment) {
            return ['error' => 'No installment found for the given ID.', 'status' => 400];
        }

        $totalLoanAmount = $loanAllocation->loan_approved_amount;
        $currentDate = Carbon::now();

        $installmentAmount = $this->calculateInstallmentAmount($totalLoanAmount, $installmentId);
        $interestAmount = $this->calculateInterestAmount($currentInstallment, $installmentAmount);
        $totalInterestToPay = $interestAmount;
        $totalAmountToPay = $installmentAmount + $totalInterestToPay;

        return [
            'installment_amount' => $installmentAmount,
            'total_interest_to_pay' => round($totalInterestToPay,4),
            'total_amount_to_pay' => round($totalAmountToPay,4),
            'distribution_date_bs' => $currentInstallment->loan_distribution_date_bs,
            'distribution_date' => $currentInstallment->loan_distribution_date,
            'due_date' => $currentInstallment->installment_due_date,
            'due_date_bs' => $currentInstallment->installment_due_date_bs,
            'status' => 200
        ];
    }



    private function calculateInstallmentAmount($totalLoanAmount, $installmentId)
    {
        $installment = Installment::find($installmentId);
        if (!$installment) {
            throw new \Exception("Installment not found");
        }

        switch ($installment->code) {
            case 'first':
                return $totalLoanAmount * 0.25; // 25% for first installment
            case 'second':
                return $totalLoanAmount * 0.40; // 40% for second installment
            case 'third':
                return $totalLoanAmount * 0.35; // Remaining 35% for third installment
            case 'total':
                return $totalLoanAmount; // 100% for total installment
            default:
                throw new \Exception("Unknown installment code");
        }
    }

    private function calculateInterestAmount($currentInstallment, $installmentAmount)
    {
        $loanDistributionDate = Carbon::parse($currentInstallment->loan_distribution_date)->startOfDay();
        $installmentDueDate = Carbon::parse($currentInstallment->installment_due_date)->startOfDay();
        $currentDate = Carbon::now()->startOfDay();

        $endDate = $currentDate->lt($installmentDueDate) ? $currentDate : $installmentDueDate;
        $daysDifference = $loanDistributionDate->diffInDays($endDate);

        $interest = ($installmentAmount * self::INTEREST_RATE * $daysDifference) / 365;

        return max(0, $interest); // Ensure interest is never negative
    }




}
