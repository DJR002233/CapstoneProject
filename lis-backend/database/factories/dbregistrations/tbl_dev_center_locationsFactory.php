<?php

namespace Database\Factories\dbregistrations;

use App\Models\dbregistrations\tbl_dev_center_locations;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class tbl_dev_center_locationsFactory extends Factory
{
    protected $model = tbl_dev_center_locations::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $location_names = [
            'SNP Country Homes',
            'Hundred Islands',
            'Mayon',
            'Cam Sur',
            'Boracay',
            'Puerto Princesa',
            'Chocolate Hills',
            'Dakak',
            'Manulife GK',
            'Bagong Sibol',
            'Lakeview 2',
            'Taal',
            'Biazon Building',
        ];
        return [
            'location_name' => fake()->unique()->randomElement($location_names),
            'location_address' => fake()->streetAddress(),
            'status' => fake()->boolean(),
            'max_registration_forms' => fake()->numberBetween(0,165),
        ];
    }
}
