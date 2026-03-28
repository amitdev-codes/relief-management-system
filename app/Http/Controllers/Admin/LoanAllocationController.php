<?php

namespace App\Http\Controllers\Admin;

use App\Enums\LoanStatus;
use App\Helpers\InterestCalculator;
use App\Http\Controllers\Controller;
use App\Http\Requests\Loan\StoreLoanAllocationRequest;
use App\Http\Requests\Loan\UpdateLoanAllocationRequest;
use App\Models\ApplicantProfile;
use App\Models\EducationalLoanFaculty;
use App\Models\Installment;
use App\Models\LoanAllocation;
use App\Models\LoanClearance;
use App\Models\LoanPayment;
use App\Models\LoanPurposeType;
use App\Models\LoanType;
use App\Models\master\MstPaymentSource;
use App\Models\MstFiscalYear;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LoanAllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        // $allowedRoles = ['admin', 'superadmin', 'localleveladmin'];
        // Query LoanAllocations with relationships using Eloquent
        $query = LoanAllocation::with([
            'user:id,first_name_np,middle_name_np,last_name_np',
            'loanPurposeType:id,name_np',
        ])
            ->select(
                'id',
                'loan_status',
                'loan_asked_date',
                'loan_provided_date',
                'loan_allocated_amount',
                'loan_approved_amount',
                'loan_asked_amount',
                'remaining_amount',
                'loan_repayment_period',
                'interest_rate',
                'remarks',
                'user_id',
                'loan_purpose_type_id'
            );

        // Apply condition based on user roles
        // if (!in_array($user->roles->first()->slug, $allowedRoles)) {
        //     $query->where('user_id', $user->id);
        // }

        // Get results and map data accordingly
        $loanAllocations = $query->get()->map(function ($loanAllocation) {
            // Loan Status Logic
            if ($loanAllocation->remaining_amount == $loanAllocation->loan_approved_amount) {
                $loanStatus = 'APPROVED';
            } elseif ($loanAllocation->remaining_amount > 0 && $loanAllocation->remaining_amount < $loanAllocation->loan_approved_amount) {
                $loanStatus = 'PARTIALLY';
            } elseif ($loanAllocation->remaining_amount == 0) {
                $loanStatus = 'COMPLETED';
            } else {
                // Fallback if loan status is not determined based on remaining_amount
                $loanStatus = $loanAllocation->loan_status ? 'APPROVED' : 'APPLIED';
            }

            // Return the mapped data
            return [
                'id' => $loanAllocation->id,
                'loan_status' => $loanStatus,
                'name' => trim($loanAllocation->user->first_name_np.' '.$loanAllocation->user->middle_name_np.' '.$loanAllocation->user->last_name_np),
                'loan_asked_date' => $loanAllocation->loan_asked_date,
                'loan_purpose_type' => $loanAllocation->loanPurposeType->name_np,
                'loan_provided_date' => $loanAllocation->loan_provided_date,
                'loan_allocated_amount' => $loanAllocation->loan_allocated_amount,
                'loan_approved_amount' => $loanAllocation->loan_approved_amount,

                'loan_asked_amount' => $loanAllocation->loan_asked_amount,
                'remaining_amount' => $loanAllocation->remaining_amount,
                'loan_repayment_period' => $loanAllocation->loan_repayment_period,
                'interest_rate' => $loanAllocation->interest_rate,
                'remarks' => $loanAllocation->remarks,
            ];
        });

        // Pass the processed data to the view
        return Inertia::render('admin/pages/loanAllocation/index', [
            'loan_allocations' => $loanAllocations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $loan_types = LoanType::all();
        $applicantProfiles = ApplicantProfile::all()->map(function ($applicant) {
            return [
                'id' => $applicant->id,
                'full_name' => $applicant->full_name,
                'full_name_np' => $applicant->full_name_np,
                'mobile_number' => $applicant->mobile_number,
                'email' => $applicant->email,
            ];
        });
        $staticData = app('staticData');

        // dd($staticData['current_fiscal_year']->first());

        $loan_purpose_types = LoanPurposeType::all();
        $installmentPeriods = Installment::all();
        $paymentModes = MstPaymentSource::all();
        $fiscalYears = MstFiscalYear::all();
        $educational_loan_faculties = DB::table('educational_loan_faculties as elf')
            ->select('elf.id', 'mf.name_np as faculty', 'elf.loan_amount')
            ->leftjoin('mst_faculties as mf', 'elf.faculty_id', 'mf.id')
            ->where('status', true)->get();

        return Inertia::render('admin/pages/loanAllocation/loanAllocationForm', [
            'current_fiscal_year_id' => $staticData['current_fiscal_year']->first(),
            'educational_loan_faculties' => $educational_loan_faculties,
            'users' => $applicantProfiles,
            'paymentModes' => $paymentModes,
            'fiscalYears' => $fiscalYears,
            'loan_types' => $loan_types,
            'installmentPeriods' => $installmentPeriods, 'loan_purpose_types' => $loan_purpose_types]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLoanAllocationRequest $request)
    {

        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $validated['palika_id'] = config('app.palika_id');
            $validated['status'] = filter_var($validated['status'], FILTER_VALIDATE_BOOLEAN);
            if ($validated['status']) {
                $validated['remaining_amount'] = $validated['loan_approved_amount'];
            }
            $datesToFormat = ['loan_asked_date', 'loan_provided_date'];
            foreach ($datesToFormat as $dateField) {
                if (isset($validated[$dateField])) {
                    $validated[$dateField] = Carbon::createFromFormat('Y-m-d', $validated[$dateField])->format('Y-m-d');
                }
            }

            $loanAllocation = LoanAllocation::create($validated);
            $multipleFileUploads = $request->file('multiple_file_uploads');
            // Handle multiple file uploads
            if ($multipleFileUploads) {
                foreach ($multipleFileUploads as $file) {
                    $loanAllocation->addMedia($file)
                        ->withResponsiveImages()
                        ->toMediaCollection('loan_documents', 'media');
                }
            }

            DB::commit();

            return redirect()->route('loanAllocations.index')->with('success', 'ऋण विवरण आवेदन सफलतापुर्बक दर्ता गरियो   !');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Loan allocation creation failed: '.$e->getMessage());

            return back()->with('error', 'An error occurred while processing your request. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanAllocation $loanAllocation)
    {
        $loan_types = LoanType::all();
        $applicantProfiles = ApplicantProfile::all()->map(function ($applicant) {
            return [
                'id' => $applicant->id,
                'full_name' => $applicant->full_name,
                'full_name_np' => $applicant->full_name_np,
                'mobile_number' => $applicant->mobile_number,
                'email' => $applicant->email,
            ];
        });
        $loan_purpose_types = LoanPurposeType::all();
        $installmentPeriods = Installment::all();
        $paymentModes = MstPaymentSource::all();
        $fiscalYears = MstFiscalYear::all();
        $previousPayments = $loanAllocation->payments;
        $previousReimbursements = $loanAllocation->reimbursements;
        $staticData = app('staticData');

        // Fetch media items and prepare them for frontend
        $mediaItems = $loanAllocation->getMedia('loan_documents')->map(function ($media) {
            return [
                'id' => $media->id,
                'name' => $media->file_name,
                'url' => $media->getUrl(),
                'mime_type' => $media->mime_type,
                'size' => $media->size,
                'human_readable_size' => $media->human_readable_size,
            ];
        });
        $loanAllocation->load('user');
        $applicantFullName = optional($loanAllocation->user)->full_name_np ?? '';
        $educational_loan_faculties = EducationalLoanFaculty::with('faculty')->where('status', true)->get()
            ->map(function ($elf) {
                return ['id' => $elf->id, 'faculty' => optional($elf->faculty)->name_np, 'loan_amount' => $elf->loan_amount];
            });

        return Inertia::render('admin/pages/loanAllocation/loanAllocationForm', [
            'loanAllocation' => $loanAllocation,
            'previousPayments' => $previousPayments,
            'previousReimbursements' => $previousReimbursements,
            'educational_loan_faculties' => $educational_loan_faculties,
            'users' => $applicantProfiles,
            'existingUser' => $applicantFullName,
            'existingFiles' => $mediaItems,
            'paymentModes' => $paymentModes,
            'fiscalYears' => $fiscalYears,
            'loan_types' => $loan_types,
            'current_fiscal_year_id' => $staticData['current_fiscal_year']->first(),
            'installmentPeriods' => $installmentPeriods,
            'loan_purpose_types' => $loan_purpose_types,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoanAllocationRequest $request, LoanAllocation $loanAllocation)
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $validated['status'] = filter_var($validated['status'], FILTER_VALIDATE_BOOLEAN);
            // Convert dates to the correct format
            $datesToFormat = ['loan_asked_date', 'loan_provided_date'];
            foreach ($datesToFormat as $dateField) {
                if (isset($validated[$dateField])) {
                    $validated[$dateField] = Carbon::createFromFormat('Y-m-d', $validated[$dateField])->format('Y-m-d');
                }
            }
            $loanAllocation->fill($validated);
            $loanAllocation->save();

            $multipleFileUploads = $request->file('multiple_file_uploads');
            if ($multipleFileUploads) {
                $applicantProfile->clearMediaCollection('loan_documents');
                foreach ($multipleFileUploads as $file) {
                    $applicantProfile->addMedia($file)
                        ->withResponsiveImages()
                        ->toMediaCollection('loan_documents', 'media');
                }
            }
            DB::commit();

            return redirect()->route('loanAllocations.index')->with('success', 'ऋण विवरण अपडेट सफलतापुर्बक गरियो!');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Loan allocation update failed: '.$e->getMessage());

            return back()->with('error', 'An error occurred while processing your request. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanAllocation $loanAllocation)
    {
        $loanAllocation->delete();

        return redirect()->route('loanAllocations.index')->with('success', 'ऋण विवरण अपडेट सफलतापुर्बक गरियो!');

    }

    public function createLoanClearance($data)
    {
        $validated = [
            'palika_id' => config('app.palika_id'),
            'fiscal_year_id' => $data['fiscal_year_id'],
            'user_id' => $data['user_id'],
            'loan_activation_date' => now(),
            'loan_allocation_id' => $data['loan_allocation_id'],
            'loan_allocated_amount' => $data['loan_allocated_amount'],
            'loan_approved_amount' => $data['loan_approved_amount'],
            'loan_description' => $data['loan_description'],
            'loan_purpose_type_id' => $data['loan_purpose_type_id'],
            'loan_educational_faculty_type_id' => $data['loan_educational_faculty_type_id'],
            'remaining_loan_clearance_amount' => $data['loan_approved_amount'],
            'loan_repayment_period' => $data['loan_repayment_period'],
            'loan_interest_rate' => $data['interest_rate'],
            'loan_status' => LoanStatus::Current->value,
            'remarks' => $data['remarks'],
        ];

        LoanClearance::create($validated);
    }

    public function loanAgreement($id)
    {
        $loanAllocation = DB::table('loan_allocations as la')
            ->leftJoin('applicant_profiles as u', 'la.user_id', '=', 'u.user_id')
            ->leftJoin('mst_loan_purpose_types as mlpt', 'la.loan_purpose_type_id', '=', 'mlpt.id')
            ->select(
                'la.id as id',
                'la.loan_status',
                DB::raw("CONCAT(u.first_name_np, ' ', u.middle_name_np, ' ', u.last_name_np) AS name"),
                'la.loan_asked_date',
                'mlpt.name_np as loan_purpose_type',
                'la.loan_provided_date',
                'la.loan_allocated_amount',
                'la.loan_asked_amount',
                'la.remaining_amount',
                'la.loan_repayment_period',
                'la.interest_rate',
                'la.file_uploads',
                'la.remarks'
            )->where('la.id', $id)->first();

        //  dd($loanAllocation);
        return Inertia::render('admin/pages/loanAllocationForm/loanAgreement', ['loanAllocation' => $loanAllocation]);
    }

    public function deleteMedia(LoanAllocation $loanAllocation, $mediaId)
    {
        $media = $loanAllocation->media()->findOrFail($mediaId);
        $media->delete();

        return redirect()->back()->with('status', 'Action was successful!');

    }

    private function createLoanPayment(LoanAllocation $loanAllocation, array $validated, array $paymentData)
    {
        $paymentData['loan_allocation_id'] = $loanAllocation->id;
        $paymentData['palika_id'] = 1;
        $paymentData['user_id'] = $validated['user_id'];
        // Calculation of loan interest rate
        $result = InterestCalculator::calculateInterest(
            $paymentData['loan_distribution_date'],
            $validated['loan_started_date'],
            $paymentData['installment_amount'],
            $validated['interest_rate']
        );
        // dd($paymentData,$validated);

        $paymentData = array_merge($paymentData, [
            'interest_rate' => $validated['interest_rate'],
            'yearly_interest_amount' => $result['yearly_interest'],
            'monthly_interest_amount' => $result['monthly_interest'],
            'daily_interest_amount' => $result['daily_interest'],
            'year' => $result['duration']['years'],
            'month' => $result['duration']['months'],
            'day' => $result['duration']['days'],
            'total_interest_amount' => $result['total_interest_amount'],
            'installment_amount_to_pay' => $result['total_interest_amount'] + $paymentData['installment_amount'],
        ]);

        $existingInstallmentsCount = LoanPayment::where('loan_allocation_id', $loanAllocation->id)->count();
        if ($existingInstallmentsCount == 0) {
            // This is the first installment, so set the due date as the loan_started_date
            $paymentData['installment_due_date'] = Carbon::parse($validated['loan_started_date']);
            $paymentData['installment_due_date_bs'] = Carbon::parse($validated['loan_started_date_bs']);
        } else {
            $lastInstallment = LoanPayment::where('loan_allocation_id', $loanAllocation->id)
                ->orderBy('installment_due_date', 'desc')
                ->first();
            if ($lastInstallment) {
                $paymentData['installment_due_date'] = Carbon::parse($lastInstallment->installment_due_date)->addDays(365);
                $paymentData['installment_due_date_bs'] = Carbon::parse($lastInstallment->installment_due_date_bs)->addDays(365);
            } else {
                $paymentData['installment_due_date'] = Carbon::parse($validated['loan_started_date']);
                $paymentData['installment_due_date_bs'] = Carbon::parse($validated['loan_started_date_bs']);
            }
        }

        LoanPayment::create($paymentData);
    }
}
