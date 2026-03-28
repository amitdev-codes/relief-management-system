<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReliefSubCategory extends Model
{
    use HasFactory;


    protected $guarded = [];

    /**
     * Get the relief type that owns the subcategory.
     */
    public function reliefType()
    {
        return $this->belongsTo(ReliefType::class, 'relief_type_id', 'id');
    }

    /**
     * Get the length unit associated with the subcategory.
     */
    public function lengthUnit(): BelongsTo
    {
        return $this->belongsTo(LengthUnit::class, 'length_unit_id', 'id');
    }
}
