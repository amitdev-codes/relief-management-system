<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReliefFundAllocationRequest;
use App\Http\Requests\StoreLoanAllocationRequest;
use App\Models\Installment;
use App\Models\LoanAllocation;
use App\Models\LoanPurposeType;
use App\Models\LoanType;
use App\Models\ReliefFundAllocation;
use App\Models\ReliefType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReliefFundAllocationController extends Controller
{
    public function index()
    {
        $query =DB::table('relief_fund_allocations as rfa')
        ->leftJoin('applicant_profiles as u', 'rfa.user_id', '=', 'u.user_id')
        ->leftJoin('mst_relief_types as mrt', 'rfa.relief_type_id', '=', 'mrt.id')
        ->select(
            'rfa.id as id',
            DB::raw("CONCAT(u.first_name_np, ' ', u.middle_name_np, ' ', u.last_name_np) AS name"),
            'rfa.incident_date as date',
            'rfa.incident_description',
            'mrt.name_np as relief_type',
            'rfa.quantity',
            'rfa.file_uploads',
            'rfa.remarks'
        );
        if(Auth::user()->role_id>=2){
            $query=$query->where('rfa.user_id',Auth::user()->id);
        }
        $relief_fund_allocations=$query->get();
        return Inertia::render('user/pages/reliefFundAllocationForm/index', [
            'relief_fund_allocations' => $relief_fund_allocations
        ]);
    }
    public function create()
    {
        $relief_types=ReliefType::all();
        return Inertia::render('user/pages/reliefFundAllocationForm/CreateReliefFundRequest',['relief_types'=>$relief_types]);
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
        $data['status']=false;
        $data['user_id']=Auth::user()->id;
        ReliefFundAllocation::create($data);
        return redirect()->route('user_relief_fund_allocations.index')->with('success', 'राहत विवरण आवेदन सफलतापुर्बक दर्ता गरियो !');
    }
}
