import React, { useState, useEffect } from "react";
import weatherService from "../../../services/weather.service";
import { Spinner } from "reactstrap";
import { BsDropletFill } from "react-icons/bs";
import { WiBarometer, WiTornado } from "react-icons/wi";

const CurrentWeather = (props) => {
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  useEffect(() => {
    const localWeatherData = JSON.parse(
      localStorage.getItem(`${props.cityName}CurrentData`)
    );
    if (
      localWeatherData &&
      Object.keys(localWeatherData).length > 0 &&
      weatherService.compareLocalDataTime()
    ) {
      setCurrentWeatherData(localWeatherData);
    } else {
      weatherService
        .getCurrentWeather(props.cityName, props.country)
        .then((res) => {
          setCurrentWeatherData(res.data.data);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `${props.cityName}CurrentData`,
      JSON.stringify(currentWeatherData)
    );
  }, [currentWeatherData]);

  const renderDate = (dateEpoch) => {
    const date = new Date(dateEpoch * 1000);
    return date.toDateString();
  };

  const {
    dateEpoch,
    icon,
    cityName,
    countryCode,
    conditions,
    temp,
    minTemp,
    maxTemp,
    pressure,
    humidity,
    windSpeed,
  } = currentWeatherData;

  return (
    <div className="current-weather-container">
      {Object.keys(currentWeatherData).length !== 0 ? (
        <div className="current-weather-items text-center">
          <p className="text-dark-orange">{renderDate(dateEpoch)}</p>
          <div className="current-main">
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
              />
            </div>
            <div className="main-temp">{temp.toFixed(0)}&#8451;</div>
          </div>
          <p className="text-dark-orange">
            {cityName}, {countryCode}
          </p>
          <p>Condition: {conditions}</p>
          <p>Min Temp: {minTemp.toFixed(0)}&#8451;</p>
          <p>Max Temp: {maxTemp.toFixed(0)}&#8451;</p>
          <p>
            Pressure: {pressure}hPa <WiBarometer size={30} color="#f96977" />
          </p>
          <p>
            Humidity: {humidity}% <BsDropletFill size={16} color="#7db4f1" />
          </p>
          <p>
            Wind Speed: {windSpeed}m/s <WiTornado size={25} color="#f8c502" />
          </p>
        </div>
      ) : (
        <div className="text-center">
          <Spinner color="warning" className="ml-5 mt-5" />
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
