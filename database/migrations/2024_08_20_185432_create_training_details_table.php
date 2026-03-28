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
        Schema::create('training_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('training_seminar_id')->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->bigInteger('institute_id')->nullable();
            $table->bigInteger('division_id')->nullable();
            $table->string('start_date_bs')->nullable();
            $table->string('end_date_bs')->nullable();
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
        Schema::dropIfExists('training_details');
    }
};
