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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid()->default(DB::raw('(UUID())'))->primary();
            $table->string('caption', 255)->nullable();
            $table->string('img_url');
            $table->timestamps();
            $table->integer('likes_count')->default(0);
            $table->foreignUuid('creator_id')
                    ->references('uuid')
                    ->on('users');
        });

        Schema::create('likes', function (Blueprint $table) {
            $table->foreignUuid('post_id')
                    ->references('uuid')
                    ->on('posts');
            $table->foreignUuid('user_id')
                    ->references('uuid')
                    ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('likes');
    }
};
