<?php

namespace App\Classes;

use Illuminate\Support\Facades\Http;

class WeatherBitClient
{
    public function getCityForecastWeather($cityName, $country)
    {
        $url = $this->createUrl($cityName, $country);
        $response = Http::get($url);

        if ($response->failed()) {
            return false;
        }

        return $this->prepareForecastData($response->json());
    }

    public function createUrl($cityName, $country)
    {
        $baseUrl = env('WEATHER_BIT_BASE_URL');
        $apiKey = env('WEATHER_BIT_API_KEY');
        return $baseUrl . '?city=' . $cityName . ',' . $country . '&key=' . $apiKey . '&hours=6';
    }

    private function prepareForecastData($response)
    {
        $forecastData = [
            'cityName' => $response['city_name'],
            'countryCode' => $response['country_code'],
            'timezone' => $response['timezone'],
        ];

        $hourly = $response['data'];
        $hourData = [];
        foreach ($hourly as $hour) {
            $hour = [
                'timestampUtc' => $hour['timestamp_utc'],
                'timestampLocal' => $hour['timestamp_local'],
                'windSpeed' => $hour['wind_spd'],
                'conditions' => $hour['weather']['description'],
                'icon' => $hour['weather']['icon'],
                'code' => $hour['weather']['code'],
                'ts' => $hour['ts'],
                'temp' => $hour['temp'],
                'humidity' => $hour['rh'],
                'pressure' => $hour['pres'],
            ];
            array_push($hourData, $hour);
        }
        $forecastData['hours'] = $hourData;

        return $forecastData;
    }
}
