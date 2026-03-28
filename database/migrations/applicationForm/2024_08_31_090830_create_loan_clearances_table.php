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
        Schema::create('loan_clearances', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('fiscal_year_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('loan_allocation_id')->nullable();
            $table->string('loan_activation_date_bs')->nullable();
            $table->string('loan_clearance_date_bs')->nullable();
            $table->date('loan_activation_date')->nullable();
            $table->date('loan_clearance_date')->nullable();
            $table->float('loan_allocated_amount',8,2)->nullable();
            $table->float('loan_approved_amount',8,2)->nullable();
            $table->longText('loan_description')->nullable();
            $table->bigInteger('loan_purpose_type_id')->nullable();
            $table->bigInteger('loan_educational_faculty_type_id')->nullable();
            $table->float('remaining_loan_clearance_amount',8,2)->nullable();
            $table->string('loan_repayment_period')->nullable();
            $table->string('loan_interest_rate')->nullable();
            $table->string('file_uploads')->nullable();
            $table->string('remarks')->nullable();
            $table->enum('loan_status', ['Current','Partially','Completed'])->default('Current');
            $table->boolean('status')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_repayments');
    }
};
