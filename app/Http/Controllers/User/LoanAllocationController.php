<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLoanAllocationRequest;
use App\Models\Installment;
use App\Models\LoanAllocation;
use App\Models\LoanPurposeType;
use App\Models\LoanType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LoanAllocationController extends Controller
{
    public function index()
    {
        $query = DB::table('loan_allocations as la')
        ->leftJoin('applicant_profiles as u', 'la.user_id', '=', 'u.user_id')
        ->leftJoin('mst_loan_types as mrt', 'la.loan_type_id', '=', 'mrt.id')
        ->leftJoin('mst_loan_purpose_types as mlpt', 'la.loan_purpose_type_id', '=', 'mlpt.id')
        ->select(
            'la.id as id',
            DB::raw("CONCAT(u.first_name_np, ' ', u.middle_name_np, ' ', u.last_name_np) AS name"),
            'la.loan_description',
            'la.loan_asked_date',
            'mrt.name_np as loan_type',
            'mlpt.name_np as loan_purpose_type',
            'la.loan_amount',
            'la.loan_distribution_date',
            'la.installments',
            'la.remaining_amount',
            'la.loan_repayment_period',
            'la.interest_rate',
            'la.file_uploads',
            'la.remarks'
        );

        if(Auth::user()->role_id>=2){
            $query=$query->where('la.user_id',Auth::user()->id);
        }
        $loan_allocations=$query->get();
        return Inertia::render('user/pages/loanAllocationForm/index', [
            'loan_allocations' => $loan_allocations
        ]);
    }
    public function create()
    {
        $loan_types=LoanType::all();
        $loan_purpose_types=LoanPurposeType::all();
        $installmentPeriods=Installment::all();
        return Inertia::render('user/pages/loanAllocationForm/CreateLoanRequest',['loan_types'=>$loan_types,'installmentPeriods'=>$installmentPeriods,'loan_purpose_types'=> $loan_purpose_types]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLoanAllocationRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('file_uploads')) {
            $data['file_uploads'] = $request->file('file_uploads')->store('file_uploads', 'public');
        }
        $data['palika_id']=1;
        $data['status']=false;
        $data['user_id']=Auth::user()->id;
        LoanAllocation::create($data);
        return redirect()->route('user_loan_fund_allocations.index')->with('success', 'ऋण विवरण आवेदन सफलतापुर्बक दर्ता गरियो !');
    }
}
