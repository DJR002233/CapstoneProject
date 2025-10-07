<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            Dev_Center_LocationsSeeder::class,
            UserSeeder::class,
            //ChildInformationSeeder::class,
            //NutritionalStatusSeeder::class,
            //ParentsInformationSeeder::class,
            //SiblingsInformationSeeder::class,
            //MasterListSeeder::class,
        ]);
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
