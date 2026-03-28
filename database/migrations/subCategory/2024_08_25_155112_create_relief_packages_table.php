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
        Schema::create('relief_packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->json('relief_package')->nullable();
            $table->string('file_uploads')->nullable();
            $table->longText('remarks')->nullable();
            $table->boolean('status')->nullable();
            $table->softDeletes();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relief_packages');
    }
};
