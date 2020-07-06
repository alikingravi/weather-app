<?php

use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class CityTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed --class=CitySeeder');
    }

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

    public function testUserHasNoCities()
    {
        $user = User::create([
            'name' => 'Billy',
            'username' => 'billy@test.com',
            'password' => '12345678',
        ]);

        $this->actingAs($user)->get('api/user/cities')->seeStatusCode(404);
    }

    public function testUserHasCitiesAttached()
    {
        $user = User::create([
            'name' => 'Jane',
            'username' => 'jane@test.com',
            'password' => '12345678',
        ]);

        $this->actingAs($user)->json('POST', 'api/user/cities', ['cityIds' => [1, 3, 6]])->seeStatusCode(200);
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }
}
