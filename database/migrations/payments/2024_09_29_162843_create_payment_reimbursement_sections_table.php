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
        Schema::create('payment_reimbursement_sections', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('fiscal_year_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('loan_allocation_id')->unsigned()->nullable();
            $table->bigInteger('installment_id')->unsigned()->nullable();
            $table->float('loan_approved_amount',8,2)->nullable();
            $table->float('installment_percentage',8,2)->nullable();
            $table->float('installment_amount',8,2)->nullable();
            $table->string('loan_distribution_date_bs')->nullable();
            $table->date('loan_distribution_date')->nullable();
            $table->string('installment_due_date_bs')->nullable();
            $table->date('installment_due_date')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_reimbursement_sections');
    }
};
