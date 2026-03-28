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
        Schema::create('program_fund_allocations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('programme_type_id')->nullable();
            $table->longText('description')->nullable();
            $table->float('budegt_estimate', 8, 2)->nullable();
            $table->float('budegt_applied', 8, 2)->nullable();
            $table->float('budegt_allocated', 8, 2)->nullable();
            $table->boolean('status')->nullable();
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->bigInteger('verified_by')->nullable();
            $table->timestamp('verified_at')->useCurrent()->useCurrentOnUpdate();
            $table->bigInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_fund_allocations');
    }
};
