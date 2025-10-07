<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;

use App\Models\dbregistrations\tbl_child_information;

class deleteArchive_command extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-archive_command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'delete all archived registrations if created_at > 5 years';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        tbl_child_information::where('created_at', '<=', DB::raw('DATE_SUB(created_at, INTERVAL 5 YEAR)'))->delete();
        $directories = Storage::allDirectories('public/images');
        for($i = 0; $i < count($directories);$i++){
            $directory = explode('/', $directories[$i]);
            if(Arr::exists($directory, 2))
                if($directory[2] <= date('Y') -5) Storage::deleteDirectory($directories[$i]);
        }
    }
}
