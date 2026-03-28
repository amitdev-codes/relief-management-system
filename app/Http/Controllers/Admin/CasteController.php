<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Caste;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CasteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/castes/Castes', ['castes' =>Caste::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/castes/CastesForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:mst_castes,name',
            'name_np' => 'required|unique:mst_castes,name_np',
        ]);
        Caste::create($validated);
        return redirect()->route('castes.index')->with('success', 'Caste Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Caste $caste)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Caste $caste)
    {
        return Inertia::render('admin/pages/Master/castes/CastesForm',['caste'=>$caste]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Caste $caste)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'name_np' => 'required',
        ]);
        $caste->fill($validatedData);
        $caste->save();
        return redirect()->route('castes.index')->with('success', 'Caste updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Caste $caste)
    {
        $caste->delete();
        return redirect()->route('castes.index')->with('success', 'Castes Deleted successfully');
    }
}
