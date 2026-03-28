<?php

use App\Enums\LoanStatus;
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
        Schema::create('loan_allocations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('fiscal_year_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->string('loan_asked_date_bs')->nullable();
            $table->string('loan_provided_date_bs')->nullable();
            $table->date('loan_asked_date')->nullable();
            $table->date('loan_provided_date')->nullable();
            $table->float('loan_asked_amount',8,2)->nullable();
            $table->float('loan_allocated_amount',8,2)->nullable();
            $table->float('loan_approved_amount',8,2)->nullable();
            $table->longText('loan_description')->nullable();
            $table->bigInteger('loan_purpose_type_id')->nullable();
            $table->bigInteger('loan_educational_faculty_type_id')->nullable();
            $table->string('institute_name')->nullable();
            $table->float('remaining_amount',8,2)->nullable();

            $table->string('loan_started_date_bs')->nullable();
            $table->date('loan_started_date')->nullable();

            $table->string('loan_repayment_period')->nullable();
            $table->string('interest_rate')->nullable();
            $table->json('multiple_file_uploads')->nullable();
            $table->string('remarks')->nullable();
            $table->enum('loan_status', ['Current','Partially', 'Completed'])->default('Current');
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
        Schema::dropIfExists('loan_allocations');
    }
};
