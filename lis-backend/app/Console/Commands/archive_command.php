<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\dbregistrations\tbl_child_information;
use App\Models\dbusers\tbl_staff_information;

class archive_command extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:archive_command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'archive all registrations';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        tbl_child_information::where('archived', '=', 0)
        ->update(['archived' => 1]);
        tbl_staff_information::query()
        ->update(['finished_grading' => '[]']);
    }
}
