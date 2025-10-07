<?php

namespace Database\Factories\dbregistrations;

use App\Models\dbregistrations\tbl_parents_information;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_parents_informationFactory extends Factory
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
            'registration_number' => $num++,//fake()->unique()->numberBetween(1,50),
            'relationship_to_the_child' => fake()->randomElement([
                'Uncle', 
                'Aunt', 
                'Grandfather', 
                'Grandmother', 
                'Older Brother', 
                'Older Sister', 
                'Cousin', 
                'Neighbor'
            ]),
            'last_name' => fake()->lastname(),
            'first_name' => fake()->firstname(),
            'middle_name' => fake()->lastname(),
            'address' => fake()->streetAddress(),
            'contact_number' => fake()->randomNumber(9, true),
            'date_of_birth' => fake()->dateTimeBetween('-100 years',now())->format('Y-m-d'),
            'age' => fake()->numberBetween(14,100),
            'sex' => fake()->randomElement(['male', 'female', 'lesbian', 'gay', 'bisexual', 'transgender', 'queer', 'questioning', 'intersex', 'asexual', '+']),
            'educational_attainment' => fake()->randomElement(['Elementary', 'High School', 'Tech/Voc', 'College']),
            'civil_status' => fake()->randomElement(['Single', 'Married', 'Widowed', 'Legally Separated', 'Divorced']),
            'occupation' => Str::random(50),
            'business_address' => fake()->streetAddress(),
            'precinct_number' => Str::random(4) .'-'. Str::random(4),
            'barangay' => fake()->streetAddress(),
            'tupad_beneficiary_year' => fake()->numberBetween(2000, 2025),
            'category' => fake()->randomElement(['Undernourished Child', 'Solo Parent', 'Unemployed', 'Others']),
            'pwd_number' => (fake()->randomNumber(2,true)) 
                                .'-'. 
                                (fake()->randomNumber(4,true)) 
                                .'-'. 
                                (fake()->randomNumber(3,true)) 
                                .'-'. 
                                (fake()->randomNumber(7,true)),
        ];
    }
}
