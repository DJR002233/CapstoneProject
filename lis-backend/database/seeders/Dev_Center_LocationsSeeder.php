<?php

namespace Database\Seeders;

use App\Models\dbregistrations\tbl_dev_center_locations;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Dev_Center_LocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        tbl_dev_center_locations::factory()->count(13)->create();
    }
}
