import React, { useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import HistoricWeather from "./HistoricWeather";
import weatherService from "../../../services/weather.service";

const CityWeather = (props) => {
  useEffect(() => {
    weatherService.setTimeTracker();
  }, []);

  const selectedCities = [...props.selectedCities[0]];
  const cities = selectedCities.map((city) => {
    return (
      <div key={city.id} className="city-container">
        <div className="row">
          <div className="col-4">
            <CurrentWeather
              key={city.id}
              cityName={city.name}
              country={city.country}
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm top-right"
                  onClick={() => props.handleDeleteCity(city.id, city.name)}
                >
                  Remove City
                </button>
                <ForecastWeather
                  key={city.id}
                  cityName={city.name}
                  country={city.country}
                />
              </div>
              <div className="col-12">
                <HistoricWeather
                  key={city.id}
                  cityName={city.name}
                  country={city.country}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{cities}</div>;
};

export default CityWeather;
