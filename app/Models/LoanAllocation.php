<?php

namespace App\Models;

use App\Enums\LoanStatus;
use App\Models\Installment;
use App\Models\LoanPayment;
use App\Models\master\MstPaymentSource;
use App\Models\PaymentReimbursementSection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class LoanAllocation extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $guarded=[];

    protected $casts = [
        'loan_status' => LoanStatus::class,
    ];

    public function payments()
    {
        return $this->hasMany(LoanPayment::class, 'loan_allocation_id');
    }
    public function reimbursements()
    {
        return $this->hasMany(PaymentReimbursementSection::class, 'loan_allocation_id');
    }

    public function loanPayments()
    {
        return $this->hasMany(LoanPayment::class, 'loan_allocation_id');
    }
    public function user()
    {
        return $this->belongsTo(ApplicantProfile::class, 'user_id');
    }

    public function loanPurposeType()
    {
        return $this->belongsTo(LoanPurposeType::class, 'loan_purpose_type_id');
    }



}
