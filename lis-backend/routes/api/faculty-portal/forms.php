<?php

use App\Http\Controllers\forms_controller;

Route::get('reg_forms', [forms_controller::class, 'reg_forms']);
Route::get('enrolled_forms', [forms_controller::class, 'enrolled_forms']);
Route::get('excluded_forms', [forms_controller::class, 'excluded_forms']);
Route::get('view_profile', [forms_controller::class, 'view_profile']);
Route::get('get_profile_picture', [forms_controller::class, 'getProfilePicture']);
Route::POST('exclude_form', [forms_controller::class, 'exclude_form']);
Route::POST('enroll_form', [forms_controller::class, 'enroll_form']);
