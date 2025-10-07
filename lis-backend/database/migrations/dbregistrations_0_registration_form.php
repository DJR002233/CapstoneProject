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
        Schema::create('tbl_child_information', function (Blueprint $table) {
            $table->id('registration_number');
            $table->unsignedinteger('registration_number_of_location')->length(3);
            $table->unsignedinteger('school_year')->length(4);
            $table->unsignedBigInteger('development_center_location')->length(20);
            $table->foreign('development_center_location')->references('location_number')->on('tbl_dev_center_locations')->onUpdate('cascade')->onDelete('cascade');
            $table->string('picture');
            $table->string('last_name', length:100);
            $table->string('first_name', length:100);
            $table->string('middle_name', length:100)->nullable();
            $table->char('suffix', length:3)->nullable();
            $table->string('nickname', length:100)->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->date('date_of_birth');
            $table->string('place_of_birth', length:100);
            $table->unsignedinteger('age')->length(2);
            $table->string('address', length:200);
            $table->string('barangay', length:50);
            $table->unsignedbiginteger('contact_number')->length(12);
            $table->string('religion', length:50);
            $table->boolean('birth_certificate')->default(0);
            $table->boolean('health_records')->default(0);
            $table->boolean('no_requirements')->default(0);
            $table->timestamps();
            $table->boolean('excluded')->default(0);
            $table->boolean('archived')->default(0);
            $table->boolean('transfer')->default(0);
        });

        Schema::create('tbl_nutritional_status', function (Blueprint $table) {
            $table->unsignedbiginteger('registration_number')->length(20)->primary();
            $table->foreign('registration_number')->references('registration_number')->on('tbl_child_information')->onUpdate('cascade')->onDelete('cascade');
            $table->string('pwd_number')->length(19)->nullable(); //RR-PPMM-BBB-NNNNNNN
            $table->string('medical_diagnosis', length:100)->nullable();
            $table->boolean('with_medical_record')->default(0);
            $table->unsignedbiginteger('4ps_reference_number')->length(12)->nullable();
            $table->date('date_of_last_deworming')->nullable();
            $table->date('date_of_last_vitamin_a_intake')->nullable();
            $table->string('upon_entry');
            $table->string('after_program')->nullable();
            $table->timestamps();
        });

        Schema::create('tbl_parents_information', function (Blueprint $table) {
            $table->unsignedbiginteger('registration_number')->length(20)->index();
            $table->foreign('registration_number')->references('registration_number')->on('tbl_child_information')->onUpdate('cascade')->onDelete('cascade');
            $table->string('relationship_to_the_child', length:20);
            $table->string('last_name', length:100);
            $table->string('first_name', length:100);
            $table->string('middle_name', length:100)->nullable();
            $table->string('address', length:200);
            $table->unsignedbiginteger('contact_number')->length(12);
            $table->date('date_of_birth');
            $table->unsignedinteger('age')->length(3)->nullable();
            $table->string('sex', length:20)->nullable();
            $table->enum('educational_attainment', ['Elementary', 'High School', 'Tech/Voc', 'College']);
            $table->enum('civil_status', ['Single', 'Married', 'Widowed', 'Legally Separated', 'Divorced']);
            $table->string('occupation', length:50);
            $table->string('business_address', length:200);
            $table->string('precinct_number', length:9)->nullable();
            $table->string('barangay', length:50)->nullable();
            $table->unsignedinteger('tupad_beneficiary_year')->length(4)->nullable();
            $table->enum('category', ['Undernourished Child', 'Solo Parent', 'Unemployed', 'Others']);
            $table->string('pwd_number')->length(19)->nullable(); //RR-PPMM-BBB-NNNNNNN
            $table->timestamps();
        });

        Schema::create('tbl_siblings_information', function (Blueprint $table) {
            $table->unsignedbiginteger('registration_number')->length(20);
            $table->foreign('registration_number')->references('registration_number')->on('tbl_child_information')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name');
            $table->date('date_of_birth');
            $table->unsignedinteger('age')->length(2);
            $table->string('grade_level', length:15)->nullable();
            $table->timestamps();
        });
        /**/
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_nutritional_status');
        Schema::dropIfExists('tbl_parents_information');
        Schema::dropIfExists('tbl_siblings_information');
        Schema::dropIfExists('tbl_child_information');
        /**/
    }
};