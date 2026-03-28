<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoanClearanceDetail extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'loan_clearance_details';

    protected $guarded = [];

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = true;
}
