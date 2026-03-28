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
        Schema::create('applicant_profiles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('first_name_np')->nullable();
            $table->string('middle_name_np')->nullable();
            $table->string('last_name_np')->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->bigInteger('religion_id')->nullable();
            $table->bigInteger('gender_id')->nullable();
            $table->bigInteger('mothertongue_id')->nullable();
            $table->string('dob')->nullable();
            $table->date('dob_ad')->nullable();
            $table->string('photo')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('mobile_number')->nullable();

            $table->bigInteger('new_province')->nullable();
            $table->bigInteger('new_district')->nullable();
            $table->bigInteger('new_local_level')->nullable();
            $table->integer('new_ward')->nullable();
            $table->string('new_street_name')->nullable();

            $table->bigInteger('old_province')->nullable();
            $table->bigInteger('old_district')->nullable();
            $table->bigInteger('old_local_level')->nullable();
            $table->integer('old_ward')->nullable();
            $table->string('old_street_name')->nullable();

            $table->string('citizenship_no')->nullable();
            $table->bigInteger('citizenship_issued_district')->nullable();
            $table->string('citizenship_issued_date_bs')->nullable();
            $table->date('citizenship_issued_date_ad')->nullable();
            $table->string('citizenship_front')->nullable();
            $table->string('citizenship_back')->nullable();

            $table->integer('family_count')->nullable();
            $table->longText('remarks')->nullable();
            $table->boolean('status')->nullable()->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicant_profiles');
    }
};
