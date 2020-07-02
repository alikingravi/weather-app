<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function ($router) {
    // Register
    $router->post('register', 'AuthController@register');

    // Login
    $router->post('login', 'AuthController@login');

    // City Routes
    $router->get('cities', 'CityController@index');
    $router->get('user/cities', 'CityController@getUserCities');
    $router->post('user/cities', 'CityController@addUserCities');
    $router->post('user/cities/remove', 'CityController@removeUserCities');

    // Weather Apis
    $router->get('country/{country}/city/{cityName}/current', 'WeatherApiController@getCurrentWeather');
    $router->get('country/{country}/city/{cityName}/forecast', 'WeatherApiController@getForecastWeather');
    $router->get('country/{country}/city/{cityName}/historic', 'WeatherApiController@getPastWeather');
});
