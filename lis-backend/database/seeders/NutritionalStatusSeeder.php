<?php

namespace Database\Seeders;

use App\Models\dbregistrations\tbl_nutritional_status;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NutritionalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        tbl_nutritional_status::factory()->count(50)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 1])
        ->create();
        tbl_nutritional_status::factory()->count(50)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 51])
        ->create(
            ['pwd_number' => null, '4ps_reference_number' => null, 'date_of_last_vitamin_a_intake' => null],
        );
    }
}
