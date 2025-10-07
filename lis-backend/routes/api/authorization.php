<?php

use App\Http\Controllers\faculty_portal_controller;
use App\Http\Middleware\authCheckmiddleware;

Route::post('login', [faculty_portal_controller::class, 'login']);
Route::post('admin_login', [faculty_portal_controller::class, 'adminlogin']);
Route::post('logout', [faculty_portal_controller::class, 'logout'])
->middleware(authCheckmiddleware::class);
Route::get('authorization_level', [faculty_portal_controller::class, 'authorization_level_check']);
Route::post('change_credentials', [faculty_portal_controller::class, 'changeCredentials']);