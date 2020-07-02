<?php

namespace App\Http\Controllers;

use App\Classes\OpenWeatherMapClient;
use App\Classes\WeatherApiClient;
use App\Classes\WeatherBitClient;

class WeatherApiController extends Controller
{
    /**
     * Get City's Current Weather Data
     */
    public function getCurrentWeather($country, $cityName)
    {
        $openWeatherMapClient = new OpenWeatherMapClient();
        $data = $openWeatherMapClient->getCityCurrentWeather($cityName, $country);

        // $data2 = $this->getPastWeather($country, $cityName);

        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    /**
     * Get City's Historic Weather Data
     */
    public function getPastWeather($country, $cityName)
    {
        $date1 = date('Y-m-d', strtotime('-1 days'));
        $date2 = date('Y-m-d', strtotime('-2 days'));
        $date3 = date('Y-m-d', strtotime('-3 days'));

        $weatherApiClient = new WeatherApiClient();
        $data1 = $weatherApiClient->getCityPastWeather($cityName, $country, $date1);
        $data2 = $weatherApiClient->getCityPastWeather($cityName, $country, $date2);
        $data3 = $weatherApiClient->getCityPastWeather($cityName, $country, $date3);

        $lastThreeDays = [$data1, $data2, $data3];

        return response()->json([
            'status' => 200,
            'data' => $lastThreeDays
        ]);
    }

    /**
     * Get City's Forecast Weather Data
     */
    public function getForecastWeather($country, $cityName)
    {
        $weatherBitClient = new WeatherBitClient();
        $data = $weatherBitClient->getCityForecastWeather($cityName, $country);

        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
}
