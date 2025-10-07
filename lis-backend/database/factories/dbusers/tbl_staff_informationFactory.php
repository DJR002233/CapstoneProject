<?php

namespace Database\Factories\dbusers;

use App\Models\dbusers\tbl_users;
use App\Models\dbusers\tbl_staff_information;
use App\Models\dbregistrations\tbl_dev_center_locations;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_staff_informationFactory extends Factory
{
    protected $model = tbl_staff_information::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $factory->define($model, function (Faker\Generator $faker) {
        //     return [
        //         'id' => $faker->unique()->numberBetween(1, tbl_users::count()),
        //         'first_name' => fake()->firstname(),
        //         'middle_name' => fake()->lastname(),
        //         'last_name' => fake()->lastname(),
        //         'suffix' => Str::random(3),
        //         //'location_post' => '',
        //     ];
        // });
        return [
            'staff_id' => fake()->unique()->numberBetween(
                tbl_users::all()->min('account_number'), 
                tbl_users::all()->max('account_number')
            ),
            'first_name' => fake()->firstname(),
            'middle_name' => fake()->lastname(),
            'last_name' => fake()->lastname(),
            'suffix' => Str::random(3),
            'location_post' => fake()->unique()->randomElement(tbl_dev_center_locations::pluck('location_number')),
            'authorization_level' => fake()->numberBetween(0,3)
        ];
    }
}
