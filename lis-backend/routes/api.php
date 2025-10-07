<?php

use App\Http\Middleware\authCheckmiddleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([authCheckmiddleware::class])->group(function(){
    require __DIR__ . '/api/faculty-portal/dashboard.php';
    require __DIR__ . '/api/faculty-portal/forms.php';
    require __DIR__ . '/api/faculty-portal/masterlist_and_sessions.php';
    require __DIR__ . '/api/faculty-portal/grades.php';
    require __DIR__ . '/api/faculty-portal/archives.php';

    require __DIR__ . '/api/center/evaluations.php';
    require __DIR__ . '/api/admin/staff_management.php';
    require __DIR__ . '/api/admin/development_center_management.php';
});

require __DIR__ . '/api/authorization.php';
require __DIR__ . '/api/registrations.php';
require __DIR__ . '/api/childgradeview.php';
