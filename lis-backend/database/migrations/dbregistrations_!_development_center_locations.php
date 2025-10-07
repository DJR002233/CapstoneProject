<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection='dbregistrations';
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_dev_center_locations', function (Blueprint $table) {
            $table->id('location_number');
            $table->string('location_name', length:100);
            $table->string('location_address', length:200);
            $table->boolean('status');
            $table->unsignedinteger('max_registration_forms');
            $table->boolean('allow_enrollment')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_dev_center_locations');
    }
};
