<?php

namespace Database\Factories\dbregistrations;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_nutritional_statusFactory extends Factory
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
            'pwd_number' => fake()->unique()->randomNumber(9, true),
            'medical_diagnosis' => Str::random(10),
            'with_medical_record' => fake()->boolean(),
            '4ps_reference_number' => fake()->unique()->randomNumber(9, true),
            'date_of_last_deworming' => fake()->dateTimeBetween('-5 years',now())->format('Y-m-d'),
            'date_of_last_vitamin_a_intake' => fake()->dateTimeBetween('-5 years',now())->format('Y-m-d'),
            'upon_entry' => '{"weight":'.'"'.fake()->randomNumber(2, true).'"'.',"height":'.'"'.fake()->randomNumber(2, true).'"'.'}',
            // 'after_program'
        ];
    }
}
