<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cities')->insert([
            [
                'name' => 'London',
                'country' => 'GB'
            ],
            [
                'name' => 'Paris',
                'country' => 'FR'
            ],
            [
                'name' => 'Cardiff',
                'country' => 'GB'
            ],
            [
                'name' => 'Edinburgh',
                'country' => 'GB'
            ],
            [
                'name' => 'Cape Town',
                'country' => 'ZA'
            ],
            [
                'name' => 'New York',
                'country' => 'US'
            ],
            [
                'name' => 'Rome',
                'country' => 'IT'
            ],
            [
                'name' => 'Beijing',
                'country' => 'CN'
            ]
        ]);
    }
}
