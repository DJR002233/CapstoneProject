<?php

use App\Http\Controllers\masterlist_and_sessions_controller;

Route::get('session', [masterlist_and_sessions_controller::class, 'getSessionsData']);
Route::post('change_session', [masterlist_and_sessions_controller::class, 'change_session_number']);