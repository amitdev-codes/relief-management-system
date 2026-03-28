<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GrantAllocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GrantAllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grant_fund_allocations = DB::table('grant_allocations as ga')
        ->leftJoin('applicant_profiles as u', 'ga.user_id', '=', 'u.user_id')
        ->leftJoin('mst_grant_types as mrt', 'ga.grant_id', '=', 'mrt.id')
        ->select(
            'ga.id as id',
            DB::raw("CONCAT(u.first_name_np, ' ', u.middle_name_np, ' ', u.last_name_np) AS name"),
            'ga.grant_asked_date',
            'mrt.name_np as grant_type',
            'ga.grant_purpose_id',
            'ga.application_document',
            'ga.grant_receipt',
            'ga.remarks'
        )
        ->get();
    return Inertia::render('admin/pages/grantAllocationForm/index', [
        'grant_fund_allocations' => $grant_fund_allocations
    ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(GrantAllocation $grantAllocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GrantAllocation $grantAllocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GrantAllocation $grantAllocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GrantAllocation $grantAllocation)
    {
        //
    }
}
