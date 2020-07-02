import React, { useState, useEffect } from "react";
import weatherService from "../../../services/weather.service";
import { Spinner } from "reactstrap";

const ForecastWeather = (props) => {
  const [forecastWeatherData, setForecastWeatherData] = useState({});

  useEffect(() => {
    const localWeatherData = JSON.parse(
      localStorage.getItem(`${props.cityName}ForecastData`)
    );
    if (
      localWeatherData &&
      Object.keys(localWeatherData).length > 0 &&
      weatherService.compareLocalDataTime()
    ) {
      setForecastWeatherData(localWeatherData);
    } else {
      weatherService
        .getForecastWeather(props.cityName, props.country)
        .then((res) => {
          setForecastWeatherData(res.data.data);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `${props.cityName}ForecastData`,
      JSON.stringify(forecastWeatherData)
    );
  }, [forecastWeatherData]);

  const renderHour = (timestampUtc) => {
    const date = new Date(timestampUtc);
    return `${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="forecast-weather-container">
      <h3 className="text-center text-salmon-light mt-5">6 Hour Forecast</h3>
      {Object.keys(forecastWeatherData).length !== 0 ? (
        <div className="forecast-weather-items">
          {forecastWeatherData.hours.map((hour, i) => {
            return (
              <div key={i} className="hour-data">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${hour.icon}.png`}
                  alt=""
                />
                <div>{renderHour(hour.timestampLocal)}</div>
                <div>{hour.temp.toFixed(0)}&#8451;</div>
                <div>{hour.humidity}%</div>
                <div>{hour.pressure.toFixed(0)} hPa</div>
                <div>{hour.windSpeed.toFixed(1)} m/s</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center">
          <Spinner color="warning" className="ml-5 mt-5" />
        </div>
      )}
    </div>
  );
};

export default ForecastWeather;
