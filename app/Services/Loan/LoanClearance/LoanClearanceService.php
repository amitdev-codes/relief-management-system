<?php

namespace App\Services\Loan\LoanClearance;

use App\Helpers\LoanInstallmentCalculator;
use App\Models\LoanAllocation;
use App\Models\LoanClearanceDetail;
use App\Models\LoanPayment;
use App\Services\Loan\LoanAllocation\LoanCalculationService;
use Carbon\Carbon;
use Anuzpandey\LaravelNepaliDate\LaravelNepaliDate;

class LoanClearanceService
{
    private $calculator;

    public function __construct(LoanInstallmentCalculator $calculator,protected LoanCalculationService $loanCalculationService)
    {
        $this->calculator = $calculator;
    }


    public function fetchInstallmentAmount($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount,$clearedDate=null)
    {
        // Parse the dates using Carbon
        $distributionDate = Carbon::parse($loanDistributionDate);
        $dueDate = Carbon::parse($installmentDueDate);
        $todayDate = $clearedDate ? Carbon::parse($clearedDate) : Carbon::today();
        $todaysDateBs=LaravelNepaliDate::from($todayDate)->toNepaliDate();

        // dd($distributionDate, $dueDate, $installmentAmount, $interestRate, $loanAmount);
        // Compare today's date with installment due date
        if ($todayDate->lt($dueDate)) {
            // Early payment
            $result =$this->handleEarlyPayment($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount);
        } elseif ($todayDate->gt($dueDate)) {
            // Late payment
            $result= $this->handleLatePayment($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount);
        } else {
            // Exact date payment
            $result=$this->handleExactDatePayment($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount);
        }

        $result['due_date'] = $todayDate->format('Y-m-d');
        $result['due_date_bs'] = $todaysDateBs;


        return $this->formatResult($result);

    }
    public function handleEarlyPayment($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount)
    {
        $loanDetails = $this->loanCalculationService->calculateLoanDetails(
            $loanDistributionDate,
            Carbon::today(), // Payment made today (early)
            $installmentAmount,
            $interestRate,
            $loanAmount
        );
        return $loanDetails;
    }
        // Method to handle late payment calculations
    public function handleLatePayment($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount)
    {
        $loanDetails = $this->loanCalculationService->calculateLoanDetails(
                $loanDistributionDate,
                Carbon::today(),
                $installmentAmount,
                $interestRate,
                $loanAmount
            );

            // Calculate the number of days late
            $dueDate = Carbon::parse($installmentDueDate);
            $today = Carbon::today();
            $daysLate = $dueDate->diffInDays($today);

            // dd($daysLate);


            // Calculate the daily fine rate (5% converted to daily rate)
            $dailyFineRate =(0.05 / 365);

            // Calculate the fine amount
            $fineOnInstallment = round(($installmentAmount * $dailyFineRate * $daysLate),2);

            // dd($fineOnInstallment,$dailyFineRate,$daysLate,$installmentAmount );



            $fineOnInterest = $loanDetails['total_interest_amount'] * $dailyFineRate * $daysLate;
            $totalFine = round(($fineOnInstallment + $fineOnInterest),2);

            // dd($loanDetails);

            // dd($totalFine,$loanDetails['total_interest_amount'],$daysLate,$dailyFineRate,$fineOnInterest,$fineOnInstallment );

            // Add the fine to the total amount to pay
            $loanDetails['fineOnInstallment'] = $fineOnInstallment;
            $loanDetails['fineOnInterest'] = $fineOnInterest;
            $loanDetails['fine_amount'] = $totalFine;
            $loanDetails['installment_amount_to_pay'] =round($loanDetails['installment_amount_to_pay']+ $totalFine,2);


            // dd($loanDetails);

            // dd($loanDetails);

        return $loanDetails;
    }

    public function handleExactDatePayment($loanDistributionDate, $installmentDueDate, $installmentAmount, $interestRate, $loanAmount)
    {
        // No adjustment for early or late payment, just calculate normally
        $loanDetails = $this->loanCalculationService->calculateLoanDetails(
            $loanDistributionDate,
            $installmentDueDate, // Exact payment date
            $installmentAmount,
            $interestRate,
            $loanAmount
        );
        return $loanDetails;
    }

    private function formatResult($result)
    {
        return [
            'status' => 200,
            'installment_amount' => round($result['installment_amount'], 2),
            'total_interest' => round($result['total_interest_amount'], 2),
            'fine_amount' => round($result['fine_amount'] ?? 0, 2),
            'total_amount' => round($result['installment_amount_to_pay'], 2),
            'due_date' => $result['due_date'], // Assuming dates don't need rounding
            'due_date_bs' => $result['due_date_bs'] // Assuming dates don't need rounding
        ];
    }




}
