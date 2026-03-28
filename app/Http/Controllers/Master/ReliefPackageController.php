<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReliefPackage\StoreReliefPackageRequest;
use App\Models\MstReliefSubCategory;
use App\Models\ReliefPackage;
use App\Models\ReliefType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReliefPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reliefPackages = DB::table('relief_packages')->select('id', 'title', 'relief_package', 'file_uploads', 'remarks')->get();
        // Fetch relief types, sub-categories, and length units
        $relief_types = DB::table('mst_relief_types')->pluck('name_np', 'id');
        $relief_sub_categories = DB::table('mst_relief_sub_categories')->pluck('name_np', 'id');
        $length_units = DB::table('mst_length_units')->pluck('name_np', 'id');

        $processed_allocations = $reliefPackages->map(function ($allocation) use ($relief_types, $relief_sub_categories, $length_units) {
            $package_items = json_decode($allocation->relief_package, true);

            $formatted_package = collect($package_items)->map(function ($item) use ($relief_types, $relief_sub_categories, $length_units) {
                $relief_type = $relief_types[$item['relief_type_id']] ?? 'Unknown Type';
                $sub_category = $relief_sub_categories[$item['relief_sub_category_id']] ?? 'Unknown Category';
                $length_unit = $length_units[$item['length_unit_id']] ?? 'Unknown Unit';
                $quantity = $item['quantity'] ?: '0';
                return "{$relief_type} - {$sub_category} ({$quantity} {$length_unit})";
            })->implode(', ');

            return [
                'id' => $allocation->id,
                'title' => $allocation->title,
                'relief_package' => $formatted_package,
                'file_uploads' => $allocation->file_uploads,
                'remarks' => $allocation->remarks,
            ];
        });

        return Inertia::render('admin/pages/Master/reliefPackage/ReliefPackage', [
            'relief_packages' => $processed_allocations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $relief_types=ReliefType::all();
        $mst_relief_sub_categories=MstReliefSubCategory::all();
        return Inertia::render('admin/pages/Master/reliefPackage/ReliefPackageForm',
        ['relief_types'=>$relief_types,'mst_relief_sub_categories'=>$mst_relief_sub_categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReliefPackageRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('file_uploads')) {
            $data['file_uploads'] = $request->file('file_uploads')->store('file_uploads', 'public');
        }
        ReliefPackage::create($data);
        return redirect()->route('relief_packages.index')->with('success', 'ReliefPackagecreated successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ReliefPackage $reliefPackage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReliefPackage $reliefPackage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReliefPackage $reliefPackage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReliefPackage $reliefPackage)
    {
        $reliefPackage->delete();
        return redirect()->route('relief_package.index')->with('success', 'Relief Packages Deleted successfully');
    }
}
