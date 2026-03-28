<?php

namespace App\Models;

use App\Models\master\MstProvince;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;
    public $timestamps = true;


    // Specify the fillable fields
    protected $fillable = ['code', 'name', 'name_np'];

    public function province()
    {
        return $this->belongsTo(MstProvince::class, 'province_id','code');// Define relationship to Province
    }

    public function localLevels()
    {
        return $this->hasMany(LocalLevel::class, 'district_id', 'code'); // Ensure correct relationship
    }
}
