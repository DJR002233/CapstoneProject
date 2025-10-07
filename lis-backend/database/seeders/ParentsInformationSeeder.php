<?php

namespace Database\Seeders;

use App\Models\dbregistrations\tbl_parents_information;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParentsInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 1])
        ->create([
            'relationship_to_the_child' => 'Mother',
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 11])
        ->create([
            'relationship_to_the_child' => 'Mother', 'pwd_number' => null, 'tupad_beneficiary_year' => null
        ]);





        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 21])
        ->create([
            'relationship_to_the_child' => 'Father',  'middle_name' => null
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 31])
        ->create([
            'relationship_to_the_child' => 'Father', 'pwd_number' => null, 'precinct_number' => null, 'barangay' => null
        ]);





        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 41])
        ->create([]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 51])
        ->create(['pwd_number' => null]);





        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 61])
        ->create([
            'relationship_to_the_child' => 'Mother', 'middle_name' => null
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 71])
        ->create([
            'relationship_to_the_child' => 'Mother', 'tupad_beneficiary_year' => null, 'precinct_number' => null, 'barangay' => null
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 61])
        ->create([
            'relationship_to_the_child' => 'Father', 
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 71])
        ->create([
            'relationship_to_the_child' => 'Father', 'pwd_number' => null, 'tupad_beneficiary_year' => null,
        ]);





        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 81])
        ->create([
            'relationship_to_the_child' => 'Mother',
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 91])
        ->create([
            'relationship_to_the_child' => 'Mother', 'pwd_number' => null, 'tupad_beneficiary_year' => null
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 81])
        ->create([
            'relationship_to_the_child' => 'Father',  'middle_name' => null
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 91])
        ->create([
            'relationship_to_the_child' => 'Father', 'pwd_number' => null, 'precinct_number' => null, 'barangay' => null
        ]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 81])
        ->create([]);
        tbl_parents_information::factory()->count(10)
        ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 91])
        ->create(['pwd_number' => null]);
        tbl_parents_information::factory()->count(10);
    }
}
