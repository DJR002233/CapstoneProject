<?php

use App\Http\Controllers\archive_controller;

Route::get('school_years', [archive_controller::class, 'getSchoolYears']);
Route::get('get_archives_data', [archive_controller::class, 'getArchivesData']);
Route::get('get_grade', [archive_controller::class, 'getEvaluationGrades']);