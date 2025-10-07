<?php

namespace Database\Factories\dbregistrations;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_master_listFactory extends Factory
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
            'registration_number' => $num,
            'child_number' => $num++,
            'session' => fake()->numberBetween(0, 5),
        ];
    }
}
