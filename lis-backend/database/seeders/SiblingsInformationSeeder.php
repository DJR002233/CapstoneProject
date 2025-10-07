<?php

namespace Database\Seeders;

use App\Models\dbregistrations\tbl_siblings_information;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiblingsInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        tbl_siblings_information::factory()->count(30)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 1])
        ->create();

        tbl_siblings_information::factory()->count(40)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 31])
        ->create();
        tbl_siblings_information::factory()->count(40)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 31])
        ->create();

        tbl_siblings_information::factory()->count(30)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 71])
        ->create();
        tbl_siblings_information::factory()->count(30)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 71])
        ->create();
        tbl_siblings_information::factory()->count(30)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 71])
        ->create();
    }
}
