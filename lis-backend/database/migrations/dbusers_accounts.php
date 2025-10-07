<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection='dbusers';
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id('account_number');
            $table->string('username')->unique()->collation('utf8mb4_bin');
            $table->string('password');
            // $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('tbl_staff_information', function (Blueprint $table) {
            $table->unsignedBigInteger('staff_id')->length(20)->primary();
            // $table->unsignedBigInteger('account_number')->length(20);
            $table->foreign('staff_id')->references('account_number')->on('tbl_users')->onUpdate('cascade')->onDelete('cascade');
            $table->string('first_name', length:100);
            $table->string('middle_name', length:100)->nullable();
            $table->string('last_name', length:100);
            $table->string('suffix', length:10)->nullable();
            $table->string('location_post', length:100);
            $table->unsignedinteger('authorization_level')->length(1)->nullable();
            $table->string('finished_grading', length:21)->default('[]');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_staff_information');
        Schema::dropIfExists('tbl_users');
    }
};
