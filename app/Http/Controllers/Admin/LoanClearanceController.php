<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Loan\UpdateLoanClearanceRequest;
use App\Models\ApplicantProfile;
use App\Models\EducationalLoanFaculty;
use App\Models\Installment;
use App\Models\LoanClearance;
use App\Models\LoanClearanceDetail;
use App\Models\LoanPayment;
use App\Models\LoanPurposeType;
use App\Models\LoanType;
use App\Models\master\MstPaymentSource;
use App\Models\MstFiscalYear;
use App\Models\PaymentReimbursementSection;
use App\Models\User;
use App\Services\Loan\LoanClearance\LoanClearanceService;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LoanClearanceController extends Controller
{
    private $loanClearanceService;

    public function __construct(LoanClearanceService $loanClearanceService)
    {
        $this->loanClearanceService = $loanClearanceService;
    }

    public function index()
    {
        // Eager load the related applicant profile and loan purpose type
        $loan_clearances = LoanClearance::with(['applicantProfile', 'loanPurpose'])
            ->get()
            ->map(function ($loanClearance) {
                return [
                    'id' => $loanClearance->id,
                    'loan_status' => $loanClearance->loan_status,
                    'loan_purpose_type' => optional($loanClearance->loanPurpose)->name_np,  // Get loan purpose type name
                    'name' => trim(optional($loanClearance->applicantProfile)->first_name_np.' '.
                                   optional($loanClearance->applicantProfile)->middle_name_np.' '.
                                   optional($loanClearance->applicantProfile)->last_name_np),  // Concatenate names
                    'loan_clearance_date' => $loanClearance->loan_clearance_date,
                    'loan_allocated_amount' => $loanClearance->loan_allocated_amount,
                    'loan_approved_amount' => $loanClearance->loan_approved_amount,
                    'remaining_loan_clearance_amount' => $loanClearance->remaining_loan_clearance_amount,
                    'loan_repayment_period' => $loanClearance->loan_repayment_period,
                    'loan_interest_rate' => $loanClearance->loan_interest_rate,
                    'file_uploads' => $loanClearance->file_uploads,
                    'remarks' => $loanClearance->remarks,
                ];
            });
        // dd($loan_clearances);

        return Inertia::render('admin/pages/loanClearance/index', [
            'loan_clearances' => $loan_clearances,
        ]);
    }

    public function edit(LoanClearance $loanClearance)
    {
        // Fetch related data using Eloquent models and relationships
        $loan_types = LoanType::all();
        $users = ApplicantProfile::all();
        $loan_purpose_types = LoanPurposeType::all();
        $installmentPeriods = Installment::all();
        $paymentModes = MstPaymentSource::all();
        $fiscalYears = MstFiscalYear::all();

        // Eager load related payments for the loan clearance
        $previousPayments = $loanClearance->payments;
        // Fetch educational loan faculties data
        $educational_loan_faculties = EducationalLoanFaculty::with('faculty')
            ->where('status', true)
            ->get(['id', 'loan_amount', 'faculty_id']);
        $loanClearance->load('applicantProfile:user_id,first_name_np,middle_name_np,last_name_np');

        // Build the full name of the applicant
        $loanClearance->full_name = trim(
            optional($loanClearance->applicantProfile)->first_name_np.' '.
            optional($loanClearance->applicantProfile)->middle_name_np.' '.
            optional($loanClearance->applicantProfile)->last_name_np
        );
        $staticData = app('staticData');
        $currentFiscalYear = $staticData['current_fiscal_year']->first();

        // Render the Inertia page with necessary data
        return Inertia::render('admin/pages/loanClearance/LoanClearanceForm', [
            'loanClearance' => $loanClearance,
            'current_fiscal_year_id' => $currentFiscalYear,
            'fiscalYears' => $fiscalYears,
            'previousPayments' => $previousPayments,
            'educational_loan_faculties' => $educational_loan_faculties,
            'users' => $users,
            'existingUser' => $loanClearance->full_name,
            'paymentModes' => $paymentModes,
            'loan_types' => $loan_types,
            'installmentPeriods' => $installmentPeriods,
            'loan_purpose_types' => $loan_purpose_types,
        ]);
    }

    public function update(UpdateLoanClearanceRequest $request, LoanClearance $loanClearance)
    {

        try {
            DB::beginTransaction();
            $data = $request->validated();
            $data['palika_id'] = config('app.palika_id');
            $data['status'] = true;
            // $data['loan_status'] = $this->loanClearanceService->determineLoanStatus($loanClearance, $data);
            $loanClearance->fill($data);
            $loanClearance->save();

            // dd($loanClearance);
            $this->handleFileUploads($request, $loanClearance);
            $this->handleLoanPayments($request, $loanClearance);
            DB::commit();
            Log::info('Transaction committed');

            return redirect()->route('loanClearances.index')->with('success', 'ऋण चुक्ता आवेदन सफलतापुर्बक अपडेट गरियो !');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Loan clearance update failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return back()->with('error', 'An error occurred while processing your request. Please try again.');
        }
    }

    protected function handleFileUploads($request, $loanClearance)
    {
        if ($request->hasFile('multiple_file_uploads')) {
            foreach ($request->file('multiple_file_uploads') as $file) {
                $path = $file->store('loan_clearance_files', 'public');
                $loanClearance->files()->create([
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getMimeType(),
                ]);
            }
        }
    }

    private function handleLoanPayments($request, $loanClearance)
    {
        if ($request->has('paymentDetails')) {
            $newPaymentDetails = $request->input('paymentDetails');
            $existingPaymentIds = $loanClearance->loanPayments->pluck('id')->toArray();

            foreach ($newPaymentDetails as $paymentData) {
                if (isset($paymentData['id']) && in_array($paymentData['id'], $existingPaymentIds)) {
                    $this->updateExistingPayment($paymentData, $loanClearance, $existingPaymentIds);
                } else {
                    $this->createNewPayment($paymentData, $loanClearance);
                }
            }

            // Delete any remaining existing payments that weren't in the new data
            if (! empty($existingPaymentIds)) {
                LoanClearanceDetail::whereIn('id', $existingPaymentIds)->delete();
            }
        } else {
            // If no payment details provided, delete all existing payments
            $loanClearance->loanPayments()->delete();
        }
    }
    public function destroy(LoanClearance $loanClearance)
    {
        $loanClearance->delete();
        return redirect()->route('loanClearances.index')->with('success', 'ऋण विवरण अपडेट सफलतापुर्बक गरियो!');

    }

    private function updateExistingPayment($paymentData, $loanClearance, &$existingPaymentIds)
    {
        $payment = LoanClearanceDetail::find($paymentData['id']);
        $paymentData['status'] = true;
        $paymentData['deleted_at'] = null;
        $payment->fill($paymentData);
        $payment->save();
        $existingPaymentIds = array_diff($existingPaymentIds, [$paymentData['id']]);
    }

    private function createNewPayment($paymentData, $loanClearance)
    {
        // dd($paymentData['installment_amount'], $loanClearance);
        $newPayment = new LoanClearanceDetail([
            'loan_clearance_id' => $loanClearance->id,
            'palika_id' => config('app.palika_id'),
            'user_id' => $loanClearance->user_id,
            'status' => true,
        ]);
        unset($paymentData['id']);
        $newPayment->fill($paymentData);
        $newPayment->save();

        // Update the remaining loan clearance amount
        // $this->handleRemainingPrincipalAmount($paymentData['installment_amount'], $loanClearance);

        $this->handleRemainingPrincipalAmount($loanClearance,$paymentData);
    }

    // calculation related payment
    public function fetchInstallmentAmount($userId, $installmentId)
    {
        $loanClearance=LoanClearance::where('user_id',$userId)->first();
        $loanClearanceId=$loanClearance->loan_allocation_id;
        $loan_amount=$loanClearance->remaining_loan_clearance_amount;
        $interest_rate=$loanClearance->loan_interest_rate;

        // $installment_due_date=Carbon::now()->format('Y-m-d');
        #nedd to get loan given date and installment amount
        // $loanPayment=LoanPayment::where([['loan_allocation_id',$loanClearanceId],['installment_id',$installmentId],['user_id',$userId]])->first();
        // $loan_distribution_date=$loanPayment->loan_distribution_date;
        // $installment_amount=$loanPayment->installment_amount;
        // $installment_due_date=$loanPayment->installment_due_date;

        $loanPayment=PaymentReimbursementSection::where([['loan_allocation_id',$loanClearanceId],['installment_id',$installmentId],['user_id',$userId]])->first();

        $loan_distribution_date=$loanPayment->loan_distribution_date;
        $installment_amount=$loanPayment->installment_amount;
        $installment_due_date=$loanPayment->installment_due_date;
        $installment_due_date_bs=$loanPayment->installment_due_date_bs;

            // Fetch all payment reimbursements assigned to the user
            $paymentReimbursements = PaymentReimbursementSection::where('user_id', $userId)
            ->where('loan_allocation_id', $loanClearanceId)
            ->get();

            $totalReimbursements = $paymentReimbursements->count();

            $paidInstallments = LoanClearanceDetail::where('user_id', $userId)
            ->where('loan_clearance_id', $loanClearance->id)
            ->count();

            $loanPayment = PaymentReimbursementSection::where([['loan_allocation_id', $loanClearanceId], ['installment_id', $installmentId], ['user_id', $userId]])->first();

            $loan_distribution_date = $loanPayment->loan_distribution_date;
            $installment_amount = $loanPayment->installment_amount;
            $installment_due_date = $loanPayment->installment_due_date;
            $installment_due_date_bs = $loanPayment->installment_due_date_bs;

            // Check if this is the last installment
            if ($paidInstallments + 1 == $totalReimbursements) {
                // User is paying the last installment
                // Calculate based on total remaining loan amount
                $installment_amount = $loan_amount;
            }

        // dd( $loan_distribution_date,
        // $installment_due_date,
        // $installment_amount,
        // $interest_rate,
        // $loan_amount);



        #fetch installment amount
        $result = $this->loanClearanceService->fetchInstallmentAmount(
            $loan_distribution_date,
            $installment_due_date,
            $installment_amount,
            $interest_rate,
            $loan_amount
        );

        // dd($result);



        $previousYearInterest = 0;
        $previousLoanAmount = 0;
        if ($result['status'] == 200) {
            $installmentAmount = $result['installment_amount'];
            $currentYearInterest = $result['total_interest'] ?? 0;
            $fine_amount = $result['fine_amount'] ?? 0;
            $totalInterestToPay = $currentYearInterest + $previousYearInterest;
            $currentYearTotalAmount = $installmentAmount + $currentYearInterest ?? 0;
            $totalAmountToPay = $installmentAmount + $totalInterestToPay + $previousLoanAmount+$fine_amount;

            $data=[
                'installment_amount' => $installmentAmount,
                'previous_year_remaining_interest' => $previousYearInterest,
                'current_year_interest' => $currentYearInterest,
                'total_interest_to_pay' => $totalInterestToPay,
                'total_paid_interest' => $totalPaidInterest ?? 0,
                'remaining_current_interest' => $remainingCurrentInterest ?? 0,
                'fine_amount' => $result['fine_amount'], // This should be calculated separately
                'previous_year_remaining_amount' => $previousLoanAmount,
                'current_year_total_amount' => round($currentYearTotalAmount,2),
                'total_amount_to_pay' => round($totalAmountToPay,2),
                'total_paid_amount' => round($totalAmountToPay,2),
                'total_remaining_amount' => $totalRemainingAmount ?? 0,
                'due_date_bs'=>$result['due_date_bs'],
                'installment_actual_date'=>$installment_due_date,
                'installment_actual_date_bs'=>$installment_due_date_bs,
                'status' => 200,
            ];

            // dd($data);

            return response()->json($data);
        } else {
            return response()->json([
                'error' => $result['error'],
            ], 400); // Return a 400 status for errors
        }

        return response()->json($result, $result['status']);
    }

    public function calculateFine($userId, $installmentId, $clearedDate)
    {
        $loanClearance=LoanClearance::where('user_id',$userId)->first();
        $loanClearanceId=$loanClearance->loan_allocation_id;
        $loan_amount=$loanClearance->remaining_loan_clearance_amount;
        $interest_rate=$loanClearance->loan_interest_rate;

        // $installment_due_date=Carbon::now()->format('Y-m-d');
        #nedd to get loan given date and installment amount
        // $loanPayment=LoanPayment::where([['loan_allocation_id',$loanClearanceId],['installment_id',$installmentId],['user_id',$userId]])->first();
        // $loan_distribution_date=$loanPayment->loan_distribution_date;
        // $installment_amount=$loanPayment->installment_amount;
        // $installment_due_date=$loanPayment->installment_due_date;

        $loanPayment=PaymentReimbursementSection::where([['loan_allocation_id',$loanClearanceId],['installment_id',$installmentId],['user_id',$userId]])->first();
        $loan_distribution_date=$loanPayment->loan_distribution_date;
        $installment_amount=$loanPayment->installment_amount;
        $installment_due_date=$loanPayment->installment_due_date;




        #fetch installment amount
        $result = $this->loanClearanceService->fetchInstallmentAmount(
            $loan_distribution_date,
            $installment_due_date,
            $installment_amount,
            $interest_rate,
            $loan_amount,
            $clearedDate
        );

        $previousYearInterest = 0;
        $previousLoanAmount = 0;
        if ($result['status'] == 200) {
            $installmentAmount = $result['installment_amount'];
            $currentYearInterest = $result['total_interest'] ?? 0;
            $totalInterestToPay = $currentYearInterest + $previousYearInterest;
            $currentYearTotalAmount = $installmentAmount + $currentYearInterest ?? 0;
            $totalAmountToPay = $installmentAmount + $totalInterestToPay + $previousLoanAmount;

            $data=[
                'installment_amount' => $installmentAmount,
                'previous_year_remaining_interest' => $previousYearInterest,
                'current_year_interest' => $currentYearInterest,
                'total_interest_to_pay' => $totalInterestToPay,
                'total_paid_interest' => $totalPaidInterest ?? 0,
                'remaining_current_interest' => $remainingCurrentInterest ?? 0,
                'fine_amount' => 0, // This should be calculated separately
                'previous_year_remaining_amount' => $previousLoanAmount,
                'current_year_total_amount' => $currentYearTotalAmount,
                'total_amount_to_pay' => $totalAmountToPay,
                'total_paid_amount' => $totalPaidAmount ?? 0,
                'total_remaining_amount' => $totalRemainingAmount ?? 0,
                'due_date_bs'=>$result['due_date_bs'],
                'status' => 200,
            ];

            // dd($data);

            return response()->json($data);
        } else {
            return response()->json([
                'error' => $result['error'],
            ], 400); // Return a 400 status for errors
        }

        return response()->json($result, $result['status']);
    }

    //remaining loan clearance amount
    // private function handleRemainingPrincipalAmount($installmentAmount, $loanClearance)
    // {
    //     $loanClearance->remaining_loan_clearance_amount -= $installmentAmount;
    //     if ($loanClearance->remaining_loan_clearance_amount < 0) {
    //         $loanClearance->remaining_loan_clearance_amount = 0;
    //     }
    //     $loanClearance->save();
    // }

    private function handleRemainingPrincipalAmount($loanClearance,$paymentData)
    {

        $remainingPaidAmount = $loanClearance->remaining_loan_clearance_amount;
        // Deduct fine amount
        $total_paid_amount = $this->deductFineAmount($remainingPaidAmount, $paymentData);
        // Deduct interest amount
        $total_paid_amount = $this->deductInterestAmount($total_paid_amount, $paymentData);
        // Deduct principal amount
        $remainingPaidAmount=$this->deductPrincipalAmount($remainingPaidAmount,$total_paid_amount, $paymentData);
        $loanClearance->remaining_loan_clearance_amount= $remainingPaidAmount;
        $loanClearance->save();
    }

    private function deductFineAmount($remainingPaidAmount, $paymentData)
    {

        $fineAmount = $paymentData['fine_amount'] ?? 0;
        $total_paid_amount=$paymentData['total_paid_amount'] ?? 0;
        $total_paid_amount-= $fineAmount;
        return $total_paid_amount;
    }

    private function deductInterestAmount($total_paid_amount, $paymentData)
    {
        $total_interest_to_pay= $paymentData['total_interest_to_pay'] ?? 0;
        $total_paid_amount-= $total_interest_to_pay;
        return $total_paid_amount;
    }

    private function deductPrincipalAmount($remainingPaidAmount,$total_paid_amount)
    {
        if ($remainingPaidAmount > 0) {
            $remainingPaidAmount-= $total_paid_amount;
            return $remainingPaidAmount;
        }
    }
}
