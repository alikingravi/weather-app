<?php

namespace App\Classes;

use Illuminate\Support\Facades\Http;

class OpenWeatherMapClient
{
    public function getCityCurrentWeather($cityName, $country)
    {
        $url = $this->createUrl($cityName, $country);
        $response = Http::get($url);

        if ($response->failed()) {
            return false;
        }

        return $this->prepareCurrentData($response->json());
    }

    public function createUrl($cityName, $country)
    {
        $baseUrl = env('OPEN_WEATHER_MAP_BASE_URL');
        $apiKey = env('OPEN_WEATHER_MAP_API_KEY');
        return $baseUrl . '?q=' . $cityName . ',' . $country . '&appid=' . $apiKey . '&units=metric';
    }

    private function prepareCurrentData($response)
    {
        $currentData = [
            'cityName' => $response['name'],
            'countryCode' => $response['sys']['country'],
            'sunriseEpoch' => $response['sys']['sunrise'],
            'sunsetEpoch' => $response['sys']['sunset'],
            'dateEpoch' => $response['dt'],
            'windSpeed' => $response['wind']['speed'],
            'temp' => $response['main']['temp'],
            'minTemp' => $response['main']['temp_min'],
            'maxTemp' => $response['main']['temp_max'],
            'pressure' => $response['main']['pressure'],
            'humidity' => $response['main']['humidity'],
            'conditions' => $response['weather'][0]['description'],
            'icon' => $response['weather'][0]['icon'],
        ];

        return $currentData;
    }
}
