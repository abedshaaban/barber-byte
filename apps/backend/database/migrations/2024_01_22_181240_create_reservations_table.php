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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('time');
            $table->foreignId('img_id')
            ->references('id')
            ->on('ai_images');
            $table->foreignUuid('client_id')
            ->references('uuid')
            ->on('users');
            $table->foreignUuid('shop_id')
            ->references('owner_id')
            ->on('shops');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
