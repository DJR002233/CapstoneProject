<?php

use App\Http\Controllers\center_controller;

Route::get('active_locations', [center_controller::class, 'get_active_locations']);
Route::get('evaluation_data', [center_controller::class, 'get_evaluations']);
Route::get('get_sessions', [center_controller::class, 'getSessionsData']);