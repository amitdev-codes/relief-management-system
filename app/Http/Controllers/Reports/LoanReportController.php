<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\LoanAllocation;
use App\Models\LoanClearance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanReportController extends Controller
{

    public function loanPurposeReport(Request $request)
    {


        // Fetch data with relationships
        $loanPurposeReport = LoanClearance::with(['loanPayments', 'loanPurpose', 'applicantProfile','loanEducationalFaculty.faculty'])->get()->map(function ($loanClearance) {
            // Sort payments by fiscal_year_id
            $staticData = app('staticData');
            $current_fiscal_year_id=$staticData['current_fiscal_year']->first();
            $sortedPayments = $loanClearance->loanPayments->sortBy('fiscal_year_id');
            if(!empty($sortedPayments)){
                $currentYearData = $sortedPayments->firstWhere('fiscal_year_id',$current_fiscal_year_id);
                $currentYearPaid = $currentYearData->installment_amount ?? 0;
                $currentYearInterest = $currentYearData->total_interest ?? 0;
                $currentYearFine = $currentYearData->fine_amount ?? 0;
                $currentYearAmount = $currentYearData->total_amount ?? 0;
            }

            // Initialize previous year remaining amount
            $previousYearRemainingAmount = $loanClearance->total_remaining_amount; // Assuming total_remaining_amount is from previous year
            // Get current year data

            // Extract current year data or default to zero

            // Calculate remaining current year loan amount
            $remainingCurrentYearLoanAmount = $currentYearAmount + $currentYearInterest + $previousYearRemainingAmount;



            // Concatenate names
            $fullName = trim("{$loanClearance->applicantProfile->first_name} {$loanClearance->applicantProfile->middle_name} {$loanClearance->applicantProfile->last_name}");
            $fullNameNp = trim("{$loanClearance->applicantProfile->first_name_np} {$loanClearance->applicantProfile->middle_name_np} {$loanClearance->applicantProfile->last_name_np}");
            $facultyNameNp = $loanClearance->loanEducationalFaculty->faculty->name_np ?? '';
            return [
                'id' => $loanClearance->id,
                'full_name' => "{$fullName}, {$fullNameNp}",
                'full_name_np' => $fullNameNp,
                'purpose' => $loanClearance->loanPurpose->name_np ?? '', // Handle potential null
                'faculty_name_np' => $facultyNameNp,
                'previous_year_loan_amount' => $previousYearRemainingAmount,
                'current_year_loan_amount' => $currentYearAmount,
                'total_interest' => $currentYearInterest,
                'remaining_current_year_loan_amount' => $remainingCurrentYearLoanAmount,
            ];
        });
        //payment ade by bank
        $bank_loan_payment=LoanAllocation::with(['loanPayments'])->get()->map(function($loanAllocation){
            $sortedLoanAllocationPayments = $loanAllocation->loanPayments->sortBy('fiscal_year_id');
            return [
                'loan_allocation_payments'=>$sortedLoanAllocationPayments,
            ];
        });


        return Inertia::render('admin/pages/reports/loanPurposedReport', [
            'loanPurposeReport' => $loanPurposeReport,
            'bank_loan_payment' => $bank_loan_payment,
        ]);
    }

    public function personalLedger($id) {
        // Fetch the loan clearance record for the specified ID
        $loanClearanceRecord = LoanClearance::with([
            'loanPayments',
            'loanPurpose',
            'applicantProfile',
            'applicantProfile.province',
            'applicantProfile.district',
            'applicantProfile.newLocalLevel',
            'loanEducationalFaculty.faculty'
        ])
        ->where('id', $id) // Filter by ID
        ->get(); // Get the specific record

        $userId = LoanClearance::where('id', $id)->value('user_id');

        // Map the filtered loan clearance records
        $personal_ledger = $loanClearanceRecord->map(function ($loanClearance) {
            // Sort payments by fiscal_year_id
            $sortedPayments = $loanClearance->loanPayments;
            // dd($sortedPayments);

            // Initialize previous year remaining amount
            $previousYearRemainingAmount = $loanClearance->total_remaining_amount;

            // Get current year data
            $currentYearData = $sortedPayments->firstWhere('fiscal_year_id', 8);
            $currentYearPaid = $currentYearData->installment_amount ?? 0;
            $currentYearInterest = $currentYearData->total_interest ?? 0;
            $currentYearFine = $currentYearData->fine_amount ?? 0;
            $currentYearAmount = $currentYearData->total_amount ?? 0;

            // Calculate remaining current year loan amount
            $remainingCurrentYearLoanAmount = $currentYearAmount + $currentYearInterest + $previousYearRemainingAmount;

            // Concatenate names
            $fullName = trim("{$loanClearance->applicantProfile->first_name} {$loanClearance->applicantProfile->middle_name} {$loanClearance->applicantProfile->last_name}");
            $fullNameNp = trim("{$loanClearance->applicantProfile->first_name_np} {$loanClearance->applicantProfile->middle_name_np} {$loanClearance->applicantProfile->last_name_np}");
            $facultyNameNp = $loanClearance->loanEducationalFaculty->faculty->name_np ?? '';
            $applicantProfile = $loanClearance->applicantProfile;
            $provinceNameNp = $applicantProfile->province ? $applicantProfile->province->name_np : '';
            $districtNameNp = $applicantProfile->district ? $applicantProfile->district->name_np : '';
            $localLevelNameNp = $applicantProfile->newLocalLevel ? $applicantProfile->newLocalLevel->name_np : '';

            // Construct address
            $address = trim("{$provinceNameNp}, {$districtNameNp}, {$localLevelNameNp},{$loanClearance->applicantProfile->new_ward},
            {$loanClearance->applicantProfile->new_street_name}");

            // Map payments for personal ledger
            if(!empty($sortedPayments)){
                $payments = $sortedPayments->map(function ($payment) {
                    return [
                        'loan_distribution_date_bs' => $payment->installment_actual_date_bs ?? '',
                        'receipt_no' => $payment->receipt_no ?? '',
                        'loan_description' => $payment->loan_description ?? '',
                        'account_page_number' => '', // Add if necessary
                        'installment_amount' => $payment->installment_amount ?? 0,
                        'total_paid_amount' => $payment->total_paid_amount ?? 0,
                        'total_remaining_amount' => $payment->total_remaining_amount ?? 0,
                        'total_interest' => $payment->total_interest ?? 0,
                        'total_paid_interest' => $payment->total_paid_interest ?? 0,
                        'total_remaining_interest' => $payment->total_remaining_interest ?? 0,
                        'fine_amount' => $payment->fine_amount ?? 0,
                    ];
                });
            }


            return [
                'id' => $loanClearance->id,
                'full_name' => "{$fullName}, {$fullNameNp}",
                'full_name_np' => $fullNameNp,
                'purpose' => $loanClearance->loanPurpose->name_np ?? '',
                'faculty_name_np' => $facultyNameNp,
                'previous_year_loan_amount' => $previousYearRemainingAmount,
                'current_year_loan_amount' => $currentYearAmount,
                'total_interest' => $currentYearInterest,
                'remaining_current_year_loan_amount' => $remainingCurrentYearLoanAmount,
                'approved_amount' => $loanClearance->loan_approved_amount,
                'interest_rate' => $loanClearance->loan_interest_rate,
                'contact_number' => $loanClearance->applicantProfile->mobile_number,
                'address' => $address,
                'payments' => $payments // Ledger payments
            ];
        });

        $bank_loan_payment = LoanAllocation::with(['loanPayments'])->where('user_id', $userId)->get()->flatMap(function ($loanAllocation) {
            return $loanAllocation->loanPayments->map(function ($payment) {

                return [
                    'loan_distribution_date_bs' => $payment->loan_distribution_date_bs ?? '',
                    'receipt_no' => $payment->receipt_no ?? '',
                    'loan_description' => $payment->loan_description ?? '',
                    'account_page_number' => '', // Add if necessary
                    'installment_amount' => $payment->installment_amount ?? 0,
                    'total_paid_amount' => $payment->total_paid_amount ?? 0,
                    'total_remaining_amount' => $payment->total_remaining_amount ?? 0,
                    'total_interest' => $payment->total_interest ?? 0,
                    'total_paid_interest' => $payment->total_paid_interest ?? 0,
                    'total_remaining_interest' => $payment->total_remaining_interest ?? 0,
                    'fine_amount' => $payment->fine_amount ?? 0,
                ];
            });
        });

        $combinedPayments = $personal_ledger->pluck('payments')->collapse()->merge($bank_loan_payment);
        return response()->json(['personal_ledger'=>$personal_ledger,'bank_loan_payment'=>$sortedPayments??0]);
    }

}
