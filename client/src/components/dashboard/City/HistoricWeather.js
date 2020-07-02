import React, { useState, useEffect } from "react";
import weatherService from "../../../services/weather.service";
import { Spinner } from "reactstrap";

const HistoricWeather = (props) => {
  const [historicWeatherData, setHistoricWeatherData] = useState([]);

  useEffect(() => {
    const localWeatherData = JSON.parse(
      localStorage.getItem(`${props.cityName}HistoricData`)
    );
    if (
      localWeatherData &&
      localWeatherData.length > 0 &&
      weatherService.compareLocalDataTime()
    ) {
      setHistoricWeatherData(localWeatherData);
    } else {
      weatherService
        .getHistoricWeather(props.cityName, props.country)
        .then((res) => {
          setHistoricWeatherData(res.data.data);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `${props.cityName}HistoricData`,
      JSON.stringify(historicWeatherData)
    );
  }, [historicWeatherData]);

  const renderDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <div className="historic-weather-container mt-3 mb-5">
      <h3 className="text-center text-salmon-light">
        Historic Data For Last 3 days
      </h3>
      {historicWeatherData.length !== 0 ? (
        <div className="historic-weather-items">
          {historicWeatherData.map((day, i) => {
            return (
              <div key={i} className="historic-data">
                <div className="text-salmon-light">{renderDate(day.date)}</div>
                <img className="icon-historic" src={day.icon} alt="" />
                <div>Avg Temp: {day.avgTemp}&#8451;</div>
                <div>Min Temp: {day.minTemp}&#8451;</div>
                <div>Max Temp: {day.maxTemp}&#8451;</div>
                <div>Avg Humidity: {day.avgHumidity}%</div>
                <div>Wind Speed: {day.windMph}mph</div>
                <div>Sunrise: {day.sunrise}</div>
                <div>Sunset: {day.sunset}</div>
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

export default HistoricWeather;
