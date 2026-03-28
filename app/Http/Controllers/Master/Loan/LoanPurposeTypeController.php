<?php

namespace App\Http\Controllers\Master\Loan;

use App\Http\Controllers\Controller;
use App\Models\LoanPurposeType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanPurposeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/loanPurposeTypes/LoanPurposeTypes', ['loanPurposeTypes' =>LoanPurposeType::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/loanPurposeTypes/LoanPurposeTypesForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'name_np' => 'required',
            'description' => 'required',
            'code' => 'required'

        ]);
        $validated['palika_id']=config('app.palika_id');
        LoanPurposeType::create($validated);
        return redirect()->back()->with('success', 'LoanPurposeType Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(LoanPurposeType $loanPurposeType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanPurposeType $loanPurposeType)
    {
        return Inertia::render('admin/pages/Master/loanPurposeTypes/LoanPurposeTypesForm',['loanPurposeType' =>$loanPurposeType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LoanPurposeType $loanPurposeType)
    {
        $validated = $request->validate([
            'name' => 'required',
            'name_np' => 'required',
            'description' => 'required',
            'code' => 'required'

        ]);
        $loanPurposeType->fill($validated);
        $loanPurposeType->save();
        return redirect()->back()->with('success', 'LoanPurposeType updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanPurposeType $loanPurposeType)
    {
        $loanPurposeType->delete();
        return redirect()->back()->with('success', 'LoanPurposeType Deleted successfully');
    }
}
