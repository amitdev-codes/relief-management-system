<?php

namespace App\Http\Controllers\Master\Loan;

use App\Http\Controllers\Controller;
use App\Models\EducationalLoanFaculty;
use App\Models\master\MstEduLevel;
use App\Models\master\MstFaculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationalLoanFacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $educationalLoanFaculties = EducationalLoanFaculty::all();
        $educationalLoanFaculties->load(['faculty', 'educationalLevel']);

        return $educationalLoanFaculties->map(function ($eduLoanFaculty) {
            return [
                'id' => $eduLoanFaculty->id,
                'code' => $eduLoanFaculty->code,
                'eduLoanFaculty' => $eduLoanFaculty->faculty->name_np ?? null,
                'educationalLevel' => $eduLoanFaculty->educationalLevel->name_np ?? null,
                'loan_amount' => $eduLoanFaculty->loan_amount,
                'status' => $eduLoanFaculty->status,
            ];
        });

        // return Inertia::render('admin/pages/Master/educational_loan_faculties/index',
        // [
        //     'educationalLoanFaculties' => $educationalLoanFaculties,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $faculties = MstFaculty::all();
        $edu_level = MstEduLevel::all();

        return Inertia::render('admin/pages/Master/educational_loan_faculties/EducationalLoanFacultyForm',
            [
                'faculties' => $faculties,
                'eduLevel' => $edu_level,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $staticData = app('staticData');
        $currentFiscalYear = $staticData['current_fiscal_year']->first();

        $validatedData = $request->validate([
            'faculty_id' => 'required',
            'education_level_id' => 'required',
            'loan_amount' => 'required',
            'code' => 'required',
        ]);


        $validatedData['palika_id'] = config('app.palika_id');
        $validatedData['fiscal_year_id'] = $currentFiscalYear;
        $validatedData['status'] = true;

        EducationalLoanFaculty::create($validatedData);
        return redirect()->back()->with('success', 'Grant Type Created successfully');



        // return redirect()->route('educational_loan_faculties.index')->with('success', 'Grant Type Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(EducationalLoanFaculty $educationalLoanFaculty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EducationalLoanFaculty $educationalLoanFaculty)
    {
        $faculties = MstFaculty::all();
        $edu_level = MstEduLevel::all();

        return Inertia::render('admin/pages/Master/educational_loan_faculties/EducationalLoanFacultyForm', [
            'faculties' => $faculties,
            'eduLevel' => $edu_level,
            'educationalLoanFaculty' => $educationalLoanFaculty,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EducationalLoanFaculty $educationalLoanFaculty)
    {
        $validatedData = $request->validate([
            'faculty_id' => 'required',
            'education_level_id' => 'required',
            'loan_amount' => 'required',
            'code' => 'required',
        ]);
        $educationalLoanFaculty->fill($validatedData);
        $educationalLoanFaculty->save();
        return redirect()->back()->with('success', 'Grant Type Created successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EducationalLoanFaculty $educationalLoanFaculty)
    {
        $educationalLoanFaculty->delete();

        return redirect()->back()->with('success', 'Grant Type Created successfully');
    }
}
