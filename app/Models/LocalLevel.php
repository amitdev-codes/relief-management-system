<?php

namespace App\Models;

use App\Models\District;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalLevel extends Model
{
    use HasFactory;


    // Specify the fillable fields
    protected $fillable = ['code', 'name', 'name_np'];

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'code');
    }
}
