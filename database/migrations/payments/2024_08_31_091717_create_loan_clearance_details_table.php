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
        Schema::create('loan_clearance_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('fiscal_year_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('loan_clearance_id')->unsigned()->nullable();

            $table->string('installment_actual_date_bs')->nullable();
            $table->date('installment_actual_date')->nullable();
            $table->string('installment_cleared_date_bs')->nullable();
            $table->date('installment_cleared_date')->nullable();

            $table->bigInteger('payment_source_id')->nullable();
            $table->string('receipt_no')->nullable();
            $table->bigInteger('installment_id')->nullable();

            $table->float('installment_amount', 8, 2)->nullable();
            $table->float('fine_amount', 8, 2)->nullable();
            $table->float('previous_year_remaining_amount', 8, 2)->nullable();
            $table->float('current_year_total_amount', 8, 2)->nullable();

            $table->float('current_year_interest', 8, 2)->nullable();
            $table->float('previous_year_remaining_interest', 8, 2)->nullable();
            $table->float('total_interest_to_pay', 8, 2)->nullable();
            $table->float('total_paid_interest', 8, 2)->nullable();
            $table->float('remaining_current_interest', 8, 2)->nullable();

            $table->float('total_amount_to_pay', 8, 2)->nullable();
            $table->float('total_paid_amount', 8, 2)->nullable();
            $table->float('total_remaining_amount', 8, 2)->nullable();
            $table->longText('loan_description')->nullable();
            $table->boolean('status')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->foreign('loan_clearance_id')
                ->references('id')
                ->on('loan_clearances')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_clearance_details');
    }
};
