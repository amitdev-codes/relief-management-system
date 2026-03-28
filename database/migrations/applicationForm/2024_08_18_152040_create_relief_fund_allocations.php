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
        Schema::create('relief_fund_allocations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->json('applicant_ids')->nullable();

            $table->string('incident_date')->nullable();
            $table->longText('incident_description')->nullable();
            $table->bigInteger('relief_type_id')->nullable();
            $table->bigInteger('relief_sub_category_id')->nullable();
            $table->float('quantity')->nullable();
            $table->bigInteger('package_type_id')->nullable();
            $table->json('single_package')->nullable();
            $table->float('amount', 8, 2)->nullable();
            $table->string('file_uploads')->nullable();
            $table->string('remarks')->nullable();
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
        Schema::dropIfExists('relief_fund_allocations');
    }
};
