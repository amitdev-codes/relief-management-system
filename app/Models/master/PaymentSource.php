<?php

namespace App\Models\master;

use App\Models\LoanPayment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentSource extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function loanPaymentSource()
    {
        return $this->hasMany(LoanPayment::class, 'payment_source_id');
    }
}
