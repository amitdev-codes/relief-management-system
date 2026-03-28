<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GrantType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrantTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/grantTypes/GrantTypes', ['grantTypes' =>GrantType::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/grantTypes/GrantTypesForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:mst_grant_types,name',
            'name_np' => 'required|string|max:255|unique:mst_grant_types,name_np',
            'description' => 'required|string',
            'status' => 'required|boolean',
        ]);
        GrantType::create($validatedData);
        return redirect()->route('grant_types.index')->with('success', 'Grant Type Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(GrantType $grantType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GrantType $grantType)
    {
        return Inertia::render('admin/pages/Master/grantTypes/GrantTypesForm',['grantType'=>$grantType]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GrantType $grantType)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:mst_grant_types,name,' . $grantType->id,
            'name_np' => 'required|string|max:255|unique:mst_grant_types,name_np,' . $grantType->id,
            'description' => 'required|string',
            'status' => 'required|boolean',
        ]);
        $grantType->fill($validatedData);
        $grantType->save();
        return redirect()->route('grant_types.index')->with('success', 'Grant Type Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GrantType $grantType)
    {
        $grantType->delete();
        return redirect()->route('grant_types.index')->with('success', 'Grant Type Deleted successfully');
    }
}
