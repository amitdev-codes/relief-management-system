<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    public $timestamps = true;

    // Specify the fillable fields
    protected $fillable = ['code', 'name', 'name_np'];
}
