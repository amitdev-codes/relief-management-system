<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReliefType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReliefTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/reliefTypes/ReliefTypes', ['reliefTypes' =>ReliefType::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/reliefTypes/ReliefTypesForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:mst_relief_types,name',
            'name_np' => 'required|string|max:255|unique:mst_relief_types,name_np',
            'description' => 'required|string',
            'status' => 'required|boolean'

        ]);
        $validated['palika_id']=1;
        ReliefType::create($validated);
        return redirect()->route('relief_types.index')->with('success', 'ReliefType Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(ReliefType $reliefType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReliefType $reliefType)
    {
        return Inertia::render('admin/pages/Master/reliefTypes/ReliefTypesForm',['reliefType'=>$reliefType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReliefType $reliefType)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:mst_relief_types,name,' . $reliefType->id,
            'name_np' => 'required|string|max:255|unique:mst_relief_types,name_np,' . $reliefType->id,
            'description' => 'required|string',
            'status' => 'required|boolean',
        ]);
        $reliefType->fill($validatedData);
        $reliefType->save();
        return redirect()->route('relief_types.index')->with('success', 'ReliefType Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReliefType $reliefType)
    {
        $reliefType->delete();
        return redirect()->route('relief_types.index')->with('success', 'ReliefType Deleted successfully');
    }
}
