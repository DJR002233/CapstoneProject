<?php

use App\Http\Controllers\dashboard_controller;

Route::get('dashboard', [dashboard_controller::class, 'histograms']);
Route::get('location_sy', [dashboard_controller::class, 'LocationandSchoolYear']);
Route::get('all_location_sy', [dashboard_controller::class, 'AllLocationandSchoolYear']);