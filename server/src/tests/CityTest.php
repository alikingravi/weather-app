<?php

use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class CityTest extends TestCase
{
    use DatabaseMigrations;

    public function testGetAllCitiesReturns401()
    {
        $this->get('api/cities')->seeStatusCode(401);
    }

    public function testGetAllCities()
    {
        $user = User::create([
            'name' => 'John',
            'username' => 'john@test.com',
            'password' => '12345678',
        ]);

        $this->actingAs($user)->get('api/cities')->seeStatusCode(200);
    }
}
