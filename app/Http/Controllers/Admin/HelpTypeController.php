<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HelpType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HelpTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/helpTypes/HelpTypes', ['helpTypes' =>HelpType::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/helpTypes/HelpTypesForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:mst_help_types,name',
            'name_np' => 'required|string|max:255|unique:mst_help_types,name_np',
            'description' => 'required|string',
            'status' => 'required|boolean'

        ]);
        $validated['palika_id']=1;
        HelpType::create($validated);
        return redirect()->route('help_types.index')->with('success', 'HelpType Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(HelpType $helpType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HelpType $helpType)
    {
        return Inertia::render('admin/pages/Master/helpTypes/HelpTypesForm',['helpType'=>$helpType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HelpType $helpType)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:mst_help_types,name,' . $helpType->id,
            'name_np' => 'required|string|max:255|unique:mst_help_types,name_np,' . $helpType->id,
            'description' => 'required|string',
            'status' => 'required|boolean',
        ]);
        $helpType->fill($validatedData);
        $helpType->save();
        return redirect()->route('help_types.index')->with('success', 'HelpType Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HelpType $helpType)
    {
        $helpType->delete();
        return redirect()->route('help_types.index')->with('success', 'HelpType Deleted successfully');
    }
}
