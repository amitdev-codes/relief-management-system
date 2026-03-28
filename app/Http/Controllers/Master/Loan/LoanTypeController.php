<?php

namespace App\Http\Controllers\Master\Loan;

use App\Http\Controllers\Controller;
use App\Models\LoanType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/loanTypes/LoanTypes', ['loanTypes' =>LoanType::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/loanTypes/LoanTypesForm');
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
        LoanType::create($validated);
        return redirect()->back()->with('success', 'LoanType Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(LoanType $loanType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanType $loanType)
    {
        return Inertia::render('admin/pages/Master/loanTypes/LoanTypesForm', ['loanType' =>$loanType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LoanType $loanType)
    {
        $validated = $request->validate([
            'name' => 'required',
            'name_np' => 'required',
            'description' => 'required',
             'code' => 'required'

        ]);
        $loanType->fill($validated);
        $loanType->save();
        return redirect()->back()->with('success', 'LoanType Deleted successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanType $loanType)
    {
        $loanType->delete();
        return redirect()->back()->with('success', 'LoanType Deleted successfully');
    }
}
