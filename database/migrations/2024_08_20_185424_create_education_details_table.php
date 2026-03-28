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
        Schema::create('education_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('edu_level_id')->nullable();
            $table->bigInteger('faculty_id')->nullable();
            $table->bigInteger('degree_id')->nullable();
            $table->bigInteger('division_id')->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->bigInteger('institute_id')->nullable();
            $table->string('passed_year_bs')->nullable();
            $table->string('passed_year_ad')->nullable();
            $table->string('marks_obtained')->nullable();
            $table->boolean('status')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education_details');
    }
};
