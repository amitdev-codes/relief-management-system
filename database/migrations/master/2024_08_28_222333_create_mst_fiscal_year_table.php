<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fiscal_years', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();
            $table->string('date_from_bs')->nullable();
            $table->string('date_to_bs')->nullable();
            $table->string('date_from_ad')->nullable();
            $table->string('date_to_ad')->nullable();
            $table->boolean('status')->nullable();
            $table->boolean('is_current')->nullable();
            $table->boolean('is_previous')->nullable();
            $table->boolean('is_next')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_fiscal_year');
    }
};
