<?php

use App\Http\Controllers\grades_and_evaluation_controller;

Route::get('getSessionEvaluation', [grades_and_evaluation_controller::class, 'getSessionEvaluation']);
Route::POST('uploadSessionGrades', [grades_and_evaluation_controller::class, 'addSessionGrades']);
