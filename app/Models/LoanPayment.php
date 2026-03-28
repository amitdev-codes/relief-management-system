<?php

namespace App\Models;

use App\Models\Installment;
use App\Models\LoanAllocation;
use App\Models\master\MstPaymentSource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoanPayment extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table='loan_payments';

    protected $guarded=[];

    public function installment()
    {
        return $this->belongsTo(Installment::class, 'installment_id');
    }

    public function paymentSource()
    {
        return $this->belongsTo(MstPaymentSource::class, 'payment_source_id');
    }
    public function loanAllocation()
    {
        return $this->belongsTo(LoanAllocation::class, 'loan_allocation_id');
    }
}
