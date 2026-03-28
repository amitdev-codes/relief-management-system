<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Religion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReligionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pages/Master/religions/Religions', ['religions' =>Religion::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/pages/Master/religions/ReligionsForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'name_np' => 'required',
        ]);
        Religion::create($validated);
        return redirect()->route('religions.index')->with('success', 'Religion Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Religion $religion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Religion $religion)
    {
        return Inertia::render('admin/pages/Master/religions/ReligionsForm', ['religion' =>$religion]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Religion $religion)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'name_np' => 'required',
        ]);
        $religion->fill($validatedData);
        $religion->save();
        return redirect()->route('religions.index')->with('success', 'Religion updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Religion $religion)
    {
        $religion->delete();
        return redirect()->route('religions.index')->with('success', 'Religion Deleted successfully');
    }
}
