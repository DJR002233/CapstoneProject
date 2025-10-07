<?php

use App\Http\Controllers\admin_controller;

Route::POST('save_location_info', [admin_controller::class, 'saveLocationInfo']);