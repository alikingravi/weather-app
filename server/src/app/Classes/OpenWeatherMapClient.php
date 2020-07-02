<?php

namespace App\Classes;

use Illuminate\Support\Facades\Http;

class OpenWeatherMapClient
{
    public function getCityCurrentWeather($cityName, $country)
    {
        $baseUrl = env('OPEN_WEATHER_MAP_BASE_URL');
        $apiKey = env('OPEN_WEATHER_MAP_API_KEY');
        $url = $baseUrl . '?q=' . $cityName . ',' . $country . '&appid=' . $apiKey . '&units=metric';

        $response = Http::get($url)->json();
        $currentData = $this->prepareCurrentData($response);

        return $currentData;
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
