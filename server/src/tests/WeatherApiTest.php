<?php

use App\Classes\OpenWeatherMapClient;
use App\Classes\WeatherApiClient;
use App\Classes\WeatherBitClient;

class WeatherApiTest extends TestCase
{
    public function testWeatherClientInstances()
    {
        $openWeatherMapApi = new OpenWeatherMapClient();
        $weatherApi = new WeatherApiClient();
        $weatherBitApi = new WeatherBitClient();
        $this->assertInstanceOf('App\Classes\OpenWeatherMapClient', $openWeatherMapApi);
        $this->assertInstanceOf('App\Classes\WeatherApiClient', $weatherApi);
        $this->assertInstanceOf('App\Classes\WeatherBitClient', $weatherBitApi);
    }

    public function testOpenWeatherMapClientUrl()
    {
        $openWeatherMapApi = new OpenWeatherMapClient();
        $this->assertEquals(
            'http://api.openweathermap.org/data/2.5/weather?q=london,gb&appid=2b1b4e8e6848b35ef0239f5fcdf05f8c&units=metric',
            $openWeatherMapApi->createUrl('london', 'gb')
        );
    }

    public function testWeatherApiClientUrl()
    {
        $weatherApi = new WeatherApiClient();
        $this->assertEquals(
            'http://api.weatherapi.com/v1/history.json?key=bfe004b2feb547f0ad1104340202206&q=london,gb&dt=2020-06-28',
            $weatherApi->createUrl('london', 'gb', '2020-06-28')
        );
    }

    public function testWeatherBitClientUrl()
    {
        $weatherBit = new WeatherBitClient();
        $this->assertEquals(
            'http://api.weatherbit.io/v2.0/forecast/hourly?city=london,gb&key=985a0eb6885e4dec86d25dfc372c4f0e&hours=6',
            $weatherBit->createUrl('london', 'gb')
        );
    }
}
