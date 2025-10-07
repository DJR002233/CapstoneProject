<?php

namespace Database\Factories\dbregistrations;

use App\Models\dbregistrations\tbl_siblings_information;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_siblings_informationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $num = 1;
        return [
            'registration_number' => $num++,
            'name' => fake()->name(),
            'date_of_birth' => fake()->dateTimeBetween('-5 years',now())->format('Y-m-d'),
            'age' => fake()->numberBetween(0,5),
            'grade_level' => fake()->numberBetween(0,6),
        ];
    }
}
