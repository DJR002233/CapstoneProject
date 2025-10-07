<?php

namespace Database\Seeders;

use App\Models\dbregistrations\tbl_master_list;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class MasterListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        tbl_master_list::factory()
            ->count(25)
            ->sequence(fn ($sequence) => ['registration_number' => $sequence->index + 1, 'child_number' => $sequence->index + 1])
            ->create();
    }
}
