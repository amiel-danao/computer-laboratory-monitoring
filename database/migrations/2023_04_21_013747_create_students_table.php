<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->string('address')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->default('male');
            $table->unsignedBigInteger('section_id')->nullable();
            $table->unsignedBigInteger('course_id')->nullable();
            $table->unsignedBigInteger('sy_id')->nullable();
            $table->foreign('section_id')->references('id')->on('sections');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('sy_id')->references('id')->on('school_years');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};