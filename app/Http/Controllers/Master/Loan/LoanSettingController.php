<?php

namespace App\Http\Controllers\Master\Loan;

use App\Http\Controllers\Controller;
use App\Models\EducationalLoanFaculty;
use App\Models\loan\LoanSetting;
use App\Models\LoanPurposeType;
use App\Models\LoanType;
use App\Models\master\MstEduLevel;
use App\Models\master\MstFaculty;
use App\Models\MstFiscalYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LoanSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/loanSettings/MainPage', [
            'tabsData' => [
                $this->getLoanSettingsData(),
                $this->getEducationalLoanSetting(),
                $this->getLoanPurposeTypeSetting(),
                $this->getLoanTypeSetting(),
            ],
        ]);
    }

    private function getLoanSettingsData()
    {
        return [
            'loanSettings' => LoanSetting::all(),
            'fiscalYears' => MstFiscalYear::all(),
            'loanPurposeTypes' => LoanPurposeType::all(),
        ];
    }

    private function getEducationalLoanSetting()
    {
        $faculties = MstFaculty::all();
        $edu_level = MstEduLevel::all();
        $educationalLoanFaculties = EducationalLoanFaculty::all();

        return [
            'educationalLoanFaculties' => $educationalLoanFaculties,
            'faculties' => $faculties,
            'edu_level' =>$edu_level,
        ];
    }

    private function getLoanPurposeTypeSetting()
    {
        return ['loanPurposeTypes' => LoanPurposeType::all()];
    }

    private function getLoanTypeSetting()
    {
        return ['loanPurposeTypes' => LoanType::all()];
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
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'fiscal_year_id' => 'required|integer|exists:mst_fiscal_year,id',
            'loan_purpose_type_id' => 'required|integer|exists:mst_loan_purpose_types,id',
            'interest_rate' => 'required|numeric|min:0',
            'fine_interest' => 'required|numeric|min:0',
            'loan_repayment_period' => 'required|integer|min:1',
        ]);

        // Check for validation failure
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the LoanSetting resource
        $loanSetting = LoanSetting::create($request->all());
        $loanSettingsData = $this->getLoanSettingsData();

        // Return a response after successful creation
        return Inertia::render('admin/pages/Master/loanSettings/MainPage', [
            'tabsData' => [
                $loanSettingsData,
                $this->getEducationalLoanSetting(),
                $this->getLoanPurposeTypeSetting(),
                $this->getLoanTypeSetting(),
            ],
            'message' => 'Loan setting created successfully.',
        ]);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanSetting $loanSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LoanSetting $loanSetting)
    {
        $validator = Validator::make($request->all(), [
            'fiscal_year_id' => 'required|integer|exists:mst_fiscal_year,id',
            'loan_purpose_type_id' => 'required|integer|exists:mst_loan_purpose_types,id',
            'interest_rate' => 'required|numeric|min:0',
            'fine_interest' => 'required|numeric|min:0',
            'loan_repayment_period' => 'required|integer|min:1',
        ]);

        // Check for validation failure
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Update the LoanSetting resource
        $loanSetting->update($request->all());

        $loanSettingsData = $this->getLoanSettingsData();

        // Return a response after successful creation
        return Inertia::render('admin/pages/Master/loanSettings/MainPage', [
            'tabsData' => [
                $loanSettingsData,
                $this->getEducationalLoanSetting(),
                $this->getLoanPurposeTypeSetting(),
                $this->getLoanTypeSetting(),
            ],
            'message' => 'Loan setting updated successfully.',
        ]);

        // Return a response after successful update
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanSetting $loanSetting)
    {
        // Delete the LoanSetting resource
        $loanSetting->delete();

        // Return a response after successful deletion
        return response()->json([
            'message' => 'Loan setting deleted successfully.',
        ], 200);
    }
}
