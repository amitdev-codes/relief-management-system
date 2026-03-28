<?php

namespace App\Models;

use App\Enums\LoanStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class LoanClearance extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    use SoftDeletes;



    protected $guarded = [];

    public function payments()
    {
        return $this->hasMany(LoanClearanceDetail::class, 'loan_clearance_id');
    }

    public function loanPayments()
    {
        return $this->hasMany(LoanClearanceDetail::class, 'loan_clearance_id');
    }

    public function loanReceivedPayments()
    {
        return $this->hasMany(loanPayments::class, 'loan_allocation_id');
    }

    public function loanPurpose()
    {
        return $this->belongsTo(LoanPurposeType::class, 'loan_purpose_type_id');
    }

    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class, 'user_id');
    }

    public function loanEducationalFaculty()
    {
        return $this->belongsTo(EducationalLoanFaculty::class, 'loan_educational_faculty_type_id');
    }

    protected $casts = [
        'loan_status' => LoanStatus::class,
    ];
}
