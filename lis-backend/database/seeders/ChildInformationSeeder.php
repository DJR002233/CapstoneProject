<?php

namespace Database\Seeders;

use App\Models\dbregistrations\tbl_child_information;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ChildInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        tbl_child_information::factory()
            ->count(50)
            ->sequence(fn ($sequence) => ['registration_number_of_location' => $sequence->index + 1])
            ->create([
                'development_center_location' => 5
        ]);
        tbl_child_information::factory()
            ->count(50)
            ->sequence(fn ($sequence) => ['registration_number_of_location' => $sequence->index + 51])
            ->create([
                'development_center_location' => 5, 'middle_name' => null
        ]);        
    }
}
