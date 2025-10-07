<?php

use App\Http\Controllers\admin_controller;

Route::POST('save_staff_info', [admin_controller::class, 'saveStaffInfo']);
Route::GET('get_staff_information', [admin_controller::class, 'getStaffInformation']);
Route::GET('get_all_locations', [admin_controller::class, 'getAllLocations']);