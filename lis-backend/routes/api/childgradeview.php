<?php

use App\Http\Controllers\childgradeview_controller;

Route::get('get_child_data', 
[childgradeview_controller::class, 'getChildData']);
