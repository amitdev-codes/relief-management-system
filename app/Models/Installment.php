<?php

namespace App\Models;

use App\Models\LoanPayment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    use HasFactory;


    public function loanPayments()
    {
        return $this->hasMany(LoanPayment::class, 'installment_id');
    }
}
