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

        if ($data === false) {
            return response()->json([
                'status' => 404,
                'message' => 'No current data found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $data
        ], 200);
    }

    /**
     * Get City's Historic Weather Data
     */
    public function getPastWeather($country, $cityName)
    {
        $lastThreeDays = [];
        $date1 = date('Y-m-d', strtotime('-1 days'));
        $date2 = date('Y-m-d', strtotime('-2 days'));
        $date3 = date('Y-m-d', strtotime('-3 days'));

        $weatherApiClient = new WeatherApiClient();
        $data1 = $weatherApiClient->getCityPastWeather($cityName, $country, $date1);
        $data2 = $weatherApiClient->getCityPastWeather($cityName, $country, $date2);
        $data3 = $weatherApiClient->getCityPastWeather($cityName, $country, $date3);

        if ($data1 !== false) {
            array_push($lastThreeDays, $data1);
        }
        if ($data2 !== false) {
            array_push($lastThreeDays, $data2);
        }
        if ($data3 !== false) {
            array_push($lastThreeDays, $data3);
        }

        if (empty($data1) && empty($data2) && empty($data3)) {
            return response()->json([
                'status' => 404,
                'message' => 'Data for last 3 days not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $lastThreeDays
        ], 200);
    }

    /**
     * Get City's Forecast Weather Data
     */
    public function getForecastWeather($country, $cityName)
    {
        $weatherBitClient = new WeatherBitClient();
        $data = $weatherBitClient->getCityForecastWeather($cityName, $country);

        if ($data === false) {
            return response()->json([
                'status' => 404,
                'message' => 'No forecast data found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
}
