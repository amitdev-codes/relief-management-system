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
        Schema::create('grant_allocations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('palika_id')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->string('grant_date')->nullable();
            $table->string('grant_asked_date')->nullable();
            $table->bigInteger('grant_id')->nullable();
            $table->bigInteger('grant_purpose_id')->nullable();
            $table->bigInteger('grant_business_type_id')->nullable();
            $table->string('grant_receipt')->nullable();
            $table->string('grant_quantity')->nullable();
            $table->string('application_document')->nullable();
            $table->string('sifarish_ward_document')->nullable();
            $table->string('muchulka_document')->nullable();
            $table->string('incidents_photo')->nullable();
            $table->string('poverty_document')->nullable();
            $table->string('other_documents')->nullable();
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
        Schema::dropIfExists('grant_allocations');
    }
};
