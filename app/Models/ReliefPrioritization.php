<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReliefPrioritization extends BaseModel
{
    use HasFactory;

    protected $fillable = ['name','name_np','description','status'];

}
