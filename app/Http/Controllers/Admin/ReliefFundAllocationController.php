<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReliefFundAllocation\UpdateReliefFundAllocationRequest;
use App\Http\Requests\ReliefFundAllocationRequest;
use App\Models\MstReliefSubCategory;
use App\Models\ReliefFundAllocation;
use App\Models\ReliefPackage;
use App\Models\ReliefType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReliefFundAllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $relief_fund_allocations = DB::table('relief_fund_allocations as rfa')
            ->select(
                'rfa.id',
                'rp.title as relief_package_name',
                'rfa.incident_date',
                'rfa.incident_description',
                'rfa.applicant_ids', // Change user_id to applicant_ids
                'rfa.single_package',
                'rfa.file_uploads',
                'rfa.remarks'
            )->leftJoin('relief_packages as rp','rfa.package_type_id','rp.id')
            ->get();

        // Fetch all applicant profiles
        $applicant_profiles = DB::table('applicant_profiles')
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get()
            ->keyBy('id');

        // Fetch relief types, sub-categories, and length units
        $relief_types = DB::table('mst_relief_types')->pluck('name_np', 'id');
        $relief_sub_categories = DB::table('mst_relief_sub_categories')->pluck('name_np', 'id');
        $length_units = DB::table('mst_length_units')->pluck('name_np', 'id');
        // Process the relief fund allocations to include applicant names
        $processed_allocations = $relief_fund_allocations->map(function ($allocation) use ($applicant_profiles,$relief_types, $relief_sub_categories, $length_units) {
            $applicant_ids = json_decode($allocation->applicant_ids, true);
            $applicant_names = collect($applicant_ids)->map(function ($id) use ($applicant_profiles) {
                $profile = $applicant_profiles[$id] ?? null;
                return $profile ? trim("{$profile->first_name} {$profile->middle_name} {$profile->last_name}") : '';
            })->filter()->implode(', ');

            $single_package = json_decode($allocation->single_package, true);
            $formatted_package = collect($single_package)->map(function ($item) use ($relief_types, $relief_sub_categories, $length_units) {
                $relief_type = $relief_types[$item['relief_type_id']] ?? '';
                $sub_category = $relief_sub_categories[$item['relief_sub_category_id']] ?? '';
                $length_unit = $length_units[$item['length_unit_id']] ?? '';
                return "{$relief_type} - {$sub_category} ({$item['quantity']} {$length_unit})";
            })->implode(', ');


            return [
                'id' => $allocation->id,
                'incident_date' => $allocation->incident_date,
                'incident_description' => $allocation->incident_description,
                'applicant_names' => $applicant_names,
                'single_package' => $formatted_package,
                'file_uploads' => $allocation->file_uploads,
                'remarks' => $allocation->remarks,
            ];
        });

        return Inertia::render('admin/pages/reliefAllocationForm/index', [
            'relief_fund_allocations' => $processed_allocations
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $relief_types=ReliefType::all();
        $relief_packages=ReliefPackage::all();
        $users=User::all();
        $mst_relief_sub_categories=MstReliefSubCategory::all();
        return Inertia::render('admin/pages/reliefAllocationForm/ReliefAllocationForm',['relief_packages'=>$relief_packages,
            'relief_types'=>$relief_types,'users'=>$users,'mst_relief_sub_categories'=>$mst_relief_sub_categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReliefFundAllocationRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('file_uploads')) {
            $data['file_uploads'] = $request->file('file_uploads')->store('file_uploads', 'public');
        }
        $data['palika_id']=1;
        $data['user_id']=Auth::user()->id;
        ReliefFundAllocation::create($data);
        return redirect()->route('reliefFundAllocations.index')->with('success', 'ReliefFundAllocation created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ReliefFundAllocation $reliefFundAllocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ReliefFundAllocation $reliefFundAllocation)
    {
        $relief_types = ReliefType::all();
        $users = User::all();
        $mst_relief_sub_categories = MstReliefSubCategory::all();
        $applicant_profiles = DB::table('applicant_profiles')
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get()
            ->keyBy('id');

        // Fetch relief types, sub-categories, and length units
        $relief_types = DB::table('mst_relief_types')->get(['id', 'name', 'name_np'])->keyBy('id');
        $relief_sub_categories = DB::table('mst_relief_sub_categories')->get(['id', 'name', 'name_np', 'relief_type_id'])->groupBy('relief_type_id');
        $length_units = DB::table('mst_length_units')->pluck('name_np', 'id');
        $relief_packages=DB::table('relief_packages')->get(['id','title']);

        $applicant_ids = json_decode($reliefFundAllocation->applicant_ids, true);
        $applicant_names = collect($applicant_ids)->map(function ($id) use ($applicant_profiles) {
            $profile = $applicant_profiles[$id] ?? null;
            return $profile ? trim("{$profile->first_name} {$profile->middle_name} {$profile->last_name}") : '';
        })->filter()->implode(', ');

        $single_package = json_decode($reliefFundAllocation->single_package, true);
        $processedAllocations = collect($single_package)->map(function ($item) use ($relief_types, $relief_sub_categories, $length_units) {
            return [
                'relief_type_id' => $item['relief_type_id'],
                'relief_sub_category_id' => $item['relief_sub_category_id'],
                'quantity' => $item['quantity'],
                'length_unit_id' => $item['length_unit_id'] ?? null,
            ];
        })->toArray();

        return Inertia::render('admin/pages/reliefAllocationForm/ReliefAllocationForm', [
            'reliefFundAllocation' => [
                'id' => $reliefFundAllocation->id,
                'incident_date' => $reliefFundAllocation->incident_date,
                'incident_description' => $reliefFundAllocation->incident_description,
                'applicant_ids' => implode(', ', $applicant_ids),
                'applicant_names' => $applicant_names,
                'file_uploads' => $reliefFundAllocation->file_uploads,
                'remarks' => $reliefFundAllocation->remarks,
            ],
            'processedAllocations' => $processedAllocations,
            'relief_types' => $relief_types,
            'relief_packages'=>$relief_packages,
            'relief_sub_categories' => $relief_sub_categories,
            'length_units' => $length_units,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReliefFundAllocationRequest $request, ReliefFundAllocation $reliefFundAllocation)
    {
        $validated = $request->validated();
        if ($request->hasFile('file_uploads')) {
            $validated['file_uploads'] = $request->file('file_uploads')->store('file_uploads', 'public');
        }
        $validated['palika_id']=1;
        $reliefFundAllocation->fill($validated);
        $reliefFundAllocation->save();
        return redirect()->route('reliefFundAllocations.index')->with('success', 'ReliefFundAllocation Updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReliefFundAllocation $reliefFundAllocation)
    {
        $reliefFundAllocation->delete();
        return redirect()->route('relief_fund_allocations.index')->with('success', 'Relief Fund Allocations Deleted successfully');
    }

    # fetch sub categories

    public function fetchReliefSubCategory($relief_type_id){
    $data=MstReliefSubCategory::with('lengthUnit:id,name_np')->where('relief_type_id',$relief_type_id)->get();
    return response()->json($data);
    }
}
