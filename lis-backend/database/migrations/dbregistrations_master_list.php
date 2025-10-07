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
        Schema::create('tbl_master_list', function (Blueprint $table) {
            $table->unsignedbiginteger('registration_number')->length(20)->primary();
            $table->foreign('registration_number')->references('registration_number')->on('tbl_child_information')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedinteger('child_number')->length(3);
            $table->unsignedInteger('session')->length(1)->default(0);
            $table->timestamps();
        });
        Schema::create('tbl_grades', function (Blueprint $table) {
            $table->unsignedbiginteger('registration_number')->length(20);
            $table->foreign('registration_number')->references('registration_number')->on('tbl_child_information')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedinteger('evaluation_number')->length(1);
            $table->string('gross_motor');
            $table->string('fine_motor');
            $table->string('self-help');
            $table->string('receptive_language');
            $table->string('expressive_language');
            $table->string('cognitive');
            $table->string('social-emotional');
            $table->string('sum_of_scaled_score');
            $table->string('sum_of_standard_score');
            $table->string('interpretation');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_grades');
        Schema::dropIfExists('tbl_master_list');
    }
};
