<?php

namespace App\Services\Loan\LoanAllocation;

use App\Enums\LoanStatus;
use App\Models\LoanAllocation;
use App\Models\LoanClearance;
use Carbon\Carbon;

class LoanCalculationService
{
    public function calculateLoanDetails($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount)
    {

        $distributionDate = Carbon::parse($loanDistributionDate);
        $dueDate = Carbon::parse($installmentDueDate);
        $diff = $distributionDate->diff($dueDate);
        $diffYears = $diff->y;
        $diffMonths = $diff->m;
        $diffDays = $diff->d;
        $totalDays = $distributionDate->diffInDays($dueDate);

          // Convert interest rate to decimal (e.g., 6% becomes 0.06)
        $interestRate =round($interestRate/100,4);
         // Calculate interest for full years
         $yearlyInterestAmount = $loanAmount * $interestRate * $diffYears;
            // Calculate interest for remaining full months (divide annual interest by 12)
         $monthlyInterestRate = $interestRate / 12;
         $monthlyInterestAmount = $loanAmount * $monthlyInterestRate * $diffMonths;

        // Calculate interest for remaining days (divide annual interest by 365)
        $dailyInterestRate = $interestRate / 365;
        $dailyInterestAmount = $loanAmount * $dailyInterestRate * $diffDays;

        // Total interest amount
        $totalInterestAmount = round($yearlyInterestAmount + $monthlyInterestAmount + $dailyInterestAmount, 4);
        // Total installment amount to pay including interest
        $totalInstallmentAmount = $installmentAmount + $totalInterestAmount;

        return [
            'yearly_interest_amount' => round($yearlyInterestAmount, 4),
            'monthly_interest_amount' => round($monthlyInterestAmount, 4),
            'daily_interest_amount' => round($dailyInterestAmount, 4),
            'year' =>  $diffYears,
            'month' => $diffMonths,
            'day' => $diffDays,
            'total_interest_amount' => round($totalInterestAmount, 4),
            'installment_amount' => round($installmentAmount, 4),
            'installment_amount_to_pay' => round($totalInstallmentAmount, 4),
        ];
    }

    public function updateLoanAllocation($loanAllocationId, $installmentAmount)
    {

        $loanAllocation = LoanAllocation::findOrFail($loanAllocationId);
        $remainingAmount = $loanAllocation->remaining_amount - $installmentAmount;
        if ($remainingAmount < 0) {
            throw new \Exception('Installment amount exceeds the remaining loan amount.');
        }
        $loanAllocation->update([
            'remaining_amount' => $remainingAmount,
        ]);
        return $loanAllocation;
    }
    public function revertLoanAllocation($loanAllocationId, $installmentAmount)
    {

        $loanAllocation = LoanAllocation::findOrFail($loanAllocationId);
        $remainingAmount = $loanAllocation->remaining_amount + $installmentAmount;
        if ($remainingAmount < 0) {
            throw new \Exception('Installment amount exceeds the remaining loan amount.');
        }
        $loanAllocation->update([
            'remaining_amount' => $remainingAmount,
        ]);
        return $loanAllocation;
    }
    public function updateLoanAllocationAmount($loanAllocationId, $newInstallmentAmount,$oldInstallmentAmount)
    {

        $loanAllocation = LoanAllocation::findOrFail($loanAllocationId);
        $remainingAmount = $loanAllocation->remaining_amount - $newInstallmentAmount+$oldInstallmentAmount;
        if ($remainingAmount < 0) {
            throw new \Exception('Installment amount exceeds the remaining loan amount.');
        }
        $loanAllocation->update([
            'remaining_amount' => $remainingAmount,
        ]);
        return $loanAllocation;
    }

    public function createLoanClearance($loanAllocation)
    {
        try {
            $data = ['loan_allocation_id' => $loanAllocation->id,
                'palika_id' => config('app.palika_id'),
                'user_id' => $loanAllocation->user_id,
                'fiscal_year_id' => $loanAllocation->fiscal_year_id,
                'loan_activation_date_bs' => $loanAllocation->loan_provided_date_bs,
                'loan_activation_date' => $loanAllocation->loan_provided_date,
                'loan_allocated_amount' => $loanAllocation->loan_allocated_amount,
                'loan_approved_amount' => $loanAllocation->loan_approved_amount,
                'remaining_loan_clearance_amount' => $loanAllocation->loan_approved_amount,
                'loan_description' => $loanAllocation->loan_description,
                'loan_purpose_type_id' => $loanAllocation->loan_purpose_type_id,
                'loan_educational_faculty_type_id' => $loanAllocation->loan_educational_faculty_type_id,
                'loan_repayment_period' => $loanAllocation->loan_repayment_period,
                'loan_interest_rate' => $loanAllocation->interest_rate,
                'remarks' => $loanAllocation->remarks,
                'loan_status' => LoanStatus::Current->value,
                'status' => true];
            LoanClearance::create($data);
        } catch (\Exception $e) {
            throw new \Exception('Failed to create loan clearance: '.$e->getMessage());
        }
    }
}
