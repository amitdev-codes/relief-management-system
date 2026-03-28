<?php

namespace App\Http\Controllers\Master;

use App\Helpers\InterestCalculator;
use App\Http\Controllers\Controller;
use App\Models\EducationalLoanFaculty;
use App\Models\loan\LoanSetting;
use App\Models\LoanClearance;
use App\Models\LoanPayment;
use App\Models\MstLengthUnit;
use App\Models\MstReliefSubCategory;
use App\Models\ReliefType;
use App\Services\Loan\LoanClearance\LoanClearanceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{

    protected $loanClearanceService;

    public function __construct(LoanClearanceService $loanClearanceService)
    {
        $this->loanClearanceService = $loanClearanceService;
    }

    public function fetchReliefTypes(){
      $data=ReliefType::all();
      return response()->json($data);
    }
    public function fetchReliefSubCategory(){
        $data=MstReliefSubCategory::all();
        return response()->json($data);
    }
    public function fetchLengthUnit(){
        $data=MstLengthUnit::all();
        return response()->json($data);
    }
    public function fetchEducationalLoanAmount($id){
        $data=EducationalLoanFaculty::where('faculty_id',$id)->first();
        return response()->json($data);
    }

    public function fetchEducationalInterest($id){
        $staticData = app('staticData');
        $fiscal_year_id=$staticData['current_fiscal_year'];
        $data=LoanSetting::where([['palika_id',config('app.palika_id')],['fiscal_year_id',$fiscal_year_id]])->first();
        return response()->json($data);
    }

    public function loanPayments($id)
    {
        $user=LoanClearance::find($id);


        $data = LoanPayment::with(['installment', 'paymentSource', 'loanAllocation'])
            ->where('user_id', $user->user_id)
            ->get();

        $dataArray = $data->map(function ($payment) {
            return [
                'id' => $payment->id,
                'payment_source' => $payment->paymentSource->name_np,
                'receipt_no' => $payment->receipt_no,
                'installment' => $payment->installment->name_np,
                'loan_description' => $payment->loan_description,
                //extra
                'loan_distribution_date_bs' => $payment->loan_distribution_date_bs,
                'installment_amount' => $payment->installment_amount,
                'interest_rate' => $payment->interest_rate,
                'yearly_interest_amount' => $payment->yearly_interest_amount,
                'monthly_interest_amount' => $payment->monthly_interest_amount,
                'daily_interest_amount' => $payment->daily_interest_amount,
                'year' => $payment->year,
                'month' => $payment->month,
                'day' => $payment->day,
                'installment_due_date_bs' => $payment->installment_due_date_bs,
                'total_interest_amount' => $payment->total_interest_amount,
                'installment_amount_to_pay' => $payment->installment_amount_to_pay
            ];
        });

        $firstInstallment = null;
        if ($data->isNotEmpty()) {
            $firstInstallment = [
                'dueDate' => $data->first()->installment_due_date_bs,
                'amount' => $data->first()->installment_amount_to_pay,
            ];
        }

        return response()->json([
            'payments' => $dataArray,
            'firstInstallment' => $firstInstallment,
        ]);
    }




    public function calculateFine($userId,$installmentId, $paymentDate)
    {

        $loanClearanceId=LoanClearance::where('user_id',$userId)->first();

        $result = $this->loanClearanceService->calculateFine($installmentId, $paymentDate,$loanClearanceId->loan_allocation_id);
        return response()->json($result, $result['status']);
    }
    public function processLoanClearance(Request $request)
    {
        $data = $request->validated(); // Assume you have form request validation
        $clearanceDetail = $this->loanClearanceService->processLoanClearance($data);
        return response()->json($clearanceDetail, 201);
    }
    public function permissions(){
        $user = Auth::user();
        $permissions = $user->getAllPermissions()->pluck('name');
        return response()->json([
            'permissions' => $permissions,
        ]);
    }


}
