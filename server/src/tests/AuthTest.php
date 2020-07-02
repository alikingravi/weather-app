<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class AuthTest extends TestCase
{
    use DatabaseMigrations;

    public function testUserCanRegister()
    {
        $user = [
            'name' => 'John',
            'username' => 'john@test.com',
            'password' => '12345678',
        ];

        $this->json('POST', '/api/register', $user)
            ->seeStatusCode(200)
            ->seeJson([
                'message' => 'User has been created'
            ]);
    }

    public function testUserCanLogin()
    {
        $register = [
            'name' => 'John',
            'username' => 'john@test.com',
            'password' => '12345678',
        ];

        $this->json('POST', '/api/register', $register);

        $login = [
            'username' => 'john@test.com',
            'password' => '12345678',
        ];

        $this->json('POST', '/api/login', $login)
            ->seeStatusCode(200)
            ->seeJson([
                'message' => 'Logged in successfully'
            ]);
    }
}
