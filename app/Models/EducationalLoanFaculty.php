<?php

namespace App\Models;

use App\Models\master\MstEduLevel;
use App\Models\master\MstFaculty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EducationalLoanFaculty extends Model
{
    use HasFactory;
    protected $guarded=[];


    public function faculty(): BelongsTo
    {
        return $this->belongsTo(MstFaculty::class, 'faculty_id');
    }
    public function educationalLevel(): BelongsTo
    {
        return $this->belongsTo(MstEduLevel::class, 'education_level_id');
    }

}
