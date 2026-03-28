<?php

namespace App\Models;

use App\Models\ReliefType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReliefFundAllocation extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table='relief_fund_allocations';

    // Specify the fillable fields
    protected $guarded=[];

    public function reliefType(){
        return $this->hasMany(ReliefType::class);
    }

    protected $casts = [
        'user_ids' => 'array',
        'single_package_data' => 'array',
    ];



}
