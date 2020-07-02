<?php

namespace App\Classes;

use Illuminate\Support\Facades\Http;

class WeatherApiClient
{
    public function getCityPastWeather($cityName, $country, $date)
    {
        $baseUrl = env('WEATHER_API_BASE_URL');
        $apiKey = env('WEATHER_API_KEY');
        $url = $baseUrl . '?key=' . $apiKey . '&q=' . $cityName . ',' . $country . '&dt=' . $date;

        $response = Http::get($url)->json();
        $historicData = $this->prepareHistoricData($response);

        return $historicData;
    }

    private function prepareHistoricData($response)
    {
        $historicData = [
            'cityName' => $response['location']['name'],
            'country' => $response['location']['country'],
            'localTimeEpoch' => $response['location']['localtime_epoch'],
            'localTime' => $response['location']['localtime'],
            'date' => $response['forecast']['forecastday'][0]['date'],
            'dateEpoch' => $response['forecast']['forecastday'][0]['date_epoch'],
            'maxTemp' => $response['forecast']['forecastday'][0]['day']['maxtemp_c'],
            'minTemp' => $response['forecast']['forecastday'][0]['day']['mintemp_c'],
            'avgTemp' => $response['forecast']['forecastday'][0]['day']['avgtemp_c'],
            'windMph' => $response['forecast']['forecastday'][0]['day']['maxwind_mph'],
            'avgHumidity' => $response['forecast']['forecastday'][0]['day']['avghumidity'],
            'conditions' => $response['forecast']['forecastday'][0]['day']['condition']['text'],
            'icon' => $response['forecast']['forecastday'][0]['day']['condition']['icon'],
            'code' => $response['forecast']['forecastday'][0]['day']['condition']['code'],
            'sunrise' => $response['forecast']['forecastday'][0]['astro']['sunrise'],
            'sunset' => $response['forecast']['forecastday'][0]['astro']['sunset'],
        ];

        return $historicData;
    }
}
