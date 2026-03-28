<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReliefFundAllocationRequest;
use App\Http\Requests\StoreGrantAllocationRequest;
use App\Models\GrantAllocation;
use App\Models\GrantBusinessType;
use App\Models\GrantPurposeType;
use App\Models\GrantType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GrantFundAllocationController extends Controller
{
    public function index()
    {
        $query =DB::table('grant_allocations as ga')
        ->leftJoin('applicant_profiles as u', 'ga.user_id', '=', 'u.user_id')
        ->leftJoin('mst_grant_types as mrt', 'ga.grant_id', '=', 'mrt.id')
        ->leftJoin('grant_business_types as gbt', 'ga.grant_business_type_id', '=', 'gbt.id')
        ->leftJoin('grant_purpose_types as gpt', 'ga.grant_purpose_id', '=', 'gpt.id')
        ->select(
            'ga.id as id',
            DB::raw("CONCAT(u.first_name_np, ' ', u.middle_name_np, ' ', u.last_name_np) AS name"),
            'ga.grant_asked_date',
            'mrt.name_np as grant_type',
            'gbt.name_np as grant_business_type',
            'gpt.name_np as grant_purpose_type',
            'ga.grant_quantity',
            'ga.grant_purpose_id',
            'ga.file_uploads',
            'ga.grant_receipt',
            'ga.remarks'
        );
        if(Auth::user()->role_id>=2){
            $query=$query->where('ga.user_id',Auth::user()->id);
        }
        $grant_fund_allocations=$query->get();
        return Inertia::render('user/pages/grantFundAllocationForm/index', [
            'grant_fund_allocations' => $grant_fund_allocations
        ]);
    }
    public function create()
    {
        $grant_types=GrantType::all();
        $grant_purpose_types=GrantPurposeType::all();
        $grant_business_types=GrantBusinessType::all();
        return Inertia::render('user/pages/grantFundAllocationForm/CreateGrantFundRequest',
        ['grant_types'=>$grant_types,
        'grant_business_types'=>$grant_business_types,
        'grant_purpose_types'=>$grant_purpose_types
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGrantAllocationRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('file_uploads')) {
            $data['file_uploads'] = $request->file('file_uploads')->store('file_uploads', 'public');
        }
        $data['palika_id']=1;
        $data['status']=false;
        $data['user_id']=Auth::user()->id;
        GrantAllocation::create($data);
        return redirect()->route('user_grant_fund_allocations.index')->with('success', 'राहत विवरण आवेदन सफलतापुर्बक दर्ता गरियो !');
    }
}
