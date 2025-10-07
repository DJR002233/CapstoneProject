<?php

namespace Database\Factories\dbregistrations;

use App\Models\dbregistrations\tbl_dev_center_locations;
use App\Models\dbregistrations\tbl_child_information;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_child_informationFactory extends Factory
{
    protected $model = tbl_child_information::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $num = 1;
        return [
            'registration_number_of_location' => $num,
            'school_year' => date("Y"),
            'development_center_location' => fake()->randomElement(tbl_dev_center_locations::pluck('location_number')),
            'picture' => '/child_id_pictures//'.''.$num++,
            'last_name' => fake()->lastname(),
            'first_name' => fake()->firstname(),
            'middle_name' => fake()->lastname(),
            'suffix' => Str::random(3),
            'nickname' => fake()->firstname(),
            'gender' => fake()->randomElement(['male','female']),
            'date_of_birth' => fake()->dateTimeBetween('-5 years',now())->format('Y-m-d'),
            'place_of_birth' => fake()->streetAddress(),
            'age' => fake()->numberBetween(0,5),
            'address' => fake()->streetAddress(),
            'barangay' => fake()->streetAddress(),
            'contact_number' => fake()->randomNumber(9, true),
            'religion' => fake()->lastname(),
            'birth_certificate' => fake()->boolean(),
            'health_records' => fake()->boolean(),
            'no_requirements' => fake()->boolean(),
            'excluded' => false,
            'archived' => false
        ];
    }
}
