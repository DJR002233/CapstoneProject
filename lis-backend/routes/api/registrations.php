<?php

use App\Http\Controllers\registration_form_controller;

Route::get('available_development_centers', 
[registration_form_controller::class, 'get_available_locations']);

Route::post('register', 
[registration_form_controller::class, 'add_registration_form']);

Route::get('verify_registration_form', 
[registration_form_controller::class, 'verify_registration_form']);
