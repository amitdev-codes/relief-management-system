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
        Schema::create('relief_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('relief_type_id')->nullable();
            $table->string('code', 50)->nullable();
            $table->string('name', 50)->nullable();
            $table->string('name_np', 50)->nullable();
            $table->decimal('amount', 10,2)->nullable();
            $table->foreignId('length_unit_id')->constrained('length_units')->onDelete('cascade');
            $table->longText('description')->nullable();
            $table->boolean('status')->nullable()->default(false);
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
        Schema::dropIfExists('mst_relief_sub_categories');
    }
};
