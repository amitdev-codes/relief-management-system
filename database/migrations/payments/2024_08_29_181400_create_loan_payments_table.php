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
        Schema::create('loan_payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('fiscal_year_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('loan_allocation_id')->unsigned()->nullable();
            $table->string('loan_distribution_date_bs')->nullable();
            $table->date('loan_distribution_date')->nullable();
            $table->bigInteger('payment_source_id')->nullable();
            $table->string('receipt_no')->nullable();
            $table->bigInteger('installment_id')->nullable();
            $table->float('installment_amount',8,2)->nullable();
            $table->float('interest_rate',8,2)->nullable();
            $table->float('yearly_interest_amount',8,2)->nullable();
            $table->float('monthly_interest_amount',8,2)->nullable();
            $table->float('daily_interest_amount',8,2)->nullable();
            $table->float('year')->nullable();
            $table->float('month')->nullable();
            $table->float('day')->nullable();
            $table->float('total_interest_amount',8,2)->nullable();
            $table->longText('loan_description')->nullable();
            //
            $table->float('installment_amount_to_pay',8,2)->nullable();
            $table->string('installment_due_date_bs')->nullable();
            $table->date('installment_due_date')->nullable();


            $table->string('remarks')->nullable();
            $table->boolean('status')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->foreign('loan_allocation_id')
            ->references('id')
            ->on('loan_allocations')
            ->onDelete('cascade'); // Optional: Define what happens on delete
           });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_payments');
    }
};
