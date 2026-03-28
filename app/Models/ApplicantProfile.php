<?php

namespace App\Models;

use App\Models\District;
use App\Models\LocalLevel;
use App\Models\Province;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ApplicantProfile extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $guarded = [];



    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFullNameAttribute()
    {
        return trim("{$this->first_name} {$this->middle_name} {$this->last_name}");
    }

    public function getFullNameNpAttribute()
    {
        return trim("{$this->first_name_np} {$this->middle_name_np} {$this->last_name_np}");
    }

    // public function registerMediaCollections(): void
    // {
    //     $this->addMediaCollection('photos')
    //         ->singleFile();

    //     $this->addMediaCollection('files')
    //         ->singleFile();
    // }

    public function province()
    {
        return $this->belongsTo(Province::class, 'new_province');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'new_district');
    }

    public function newLocalLevel()
    {
        return $this->belongsTo(LocalLevel::class, 'new_local_level');
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class, 'gender_id');
    }

    public function citizenshipDistrict()
    {
        return $this->belongsTo(District::class, 'citizenship_issued_district');
    }
}
