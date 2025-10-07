<?php

namespace Database\Seeders;

use App\Models\dbusers\tbl_users;
use App\Models\dbusers\tbl_staff_information;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*$user1 = tbl_users::factory()->create([
            'username'=>'No Access',
            'password'=>Hash::make('0000')
        ]);
        $user2 = tbl_users::factory()->create([
            'username'=>'Teacher',
            'password'=>Hash::make('1111')
        ]);
        $user2 = tbl_users::factory()->create([
            'username'=>'Officer',
            'password'=>Hash::make('2222')
        ]);*/
        $user2 = tbl_users::factory()->create([
            'username'=>'Admin',
            'password'=>Hash::make('0000')
        ]);
        /*tbl_staff_information::factory()->create([
            'staff_id' => 1,
            'authorization_level' => 0,
        ]);
        tbl_staff_information::factory()->create([
            'location_post' => 5,
            'staff_id' => 2,
            'authorization_level' => 1,
        ]);
        tbl_staff_information::factory()->create([
            'staff_id' => 3,
            'authorization_level' => 2,
        ]);*/
        tbl_staff_information::factory()->create([
            'staff_id' => 1,
            'authorization_level' => 3,
        ]);
    }
}
