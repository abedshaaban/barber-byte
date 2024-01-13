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
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        DB::table('roles')->insert([
            [ 
             'name' => 'user',
             ],
            [ 
             'name' => 'seller',
             ],
            [ 
             'name' => 'admin',
             ],
             
         ]);

        Schema::create('genders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        DB::table('genders')->insert([
            [ 
             'name' => 'male',
             ],
            [ 
             'name' => 'female',
             ],
            [ 
             'name' => 'null',
             ],
             
         ]);

        Schema::create('account_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        DB::table('account_statuses')->insert([
            [ 
             'name' => 'private',
             ],
            [ 
             'name' => 'public',
             ],             
         ]);

        Schema::create('users', function (Blueprint $table) {
            $table->uuid()->default(DB::raw('(UUID())'))->primary();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('description', 255)->nullable();
            $table->text('img_url')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->date('birth_date');
            $table->foreignId('role_id')
                    ->references('id')
                    ->on('roles');
            $table->foreignId('gender_id')
                    ->references('id')
                    ->on('genders');
            $table->foreignId('account_status_id')
                    ->references('id')
                    ->on('account_statuses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
        Schema::dropIfExists('genders');
        Schema::dropIfExists('account_status');
        Schema::dropIfExists('users');
    }
};