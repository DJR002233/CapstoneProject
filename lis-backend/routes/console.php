<?php
 
// use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\archive_command;
use App\Console\Commands\deleteArchive_command;

// use App\Http\Controllers\archive_controller;
// use Illuminate\Support\Facades\Storage;
 
// Schedule::call()->yearlyOn(6, 1, '00:00');
// Schedule::call(function () {
//     Storage::disk('local')->put('example.txt', 'Contents');
// })->everySecond();
Schedule::command(archive_command::class)
->yearlyOn(7, 1, '00:00');
Schedule::command(deleteArchive_command::class)
->yearlyOn(7, 1, '00:00');
// Schedule::command(deleteArchive_command::class)
// ->everysecond();