import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import userService from "../../services/user.service";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import CityWeather from "./City/CityWeather";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    if (!user) history.push("/login");
  }, []);

  useEffect(() => {
    if (user) {
      userService.getUserCities().then((res) => {
        if (res.data && res.data.length !== 0) {
          setSelectedCities([...selectedCities, res.data]);
        } else {
          history.push("/select-cities");
        }
      });
    }
  }, []);

  const handleDeleteCity = (cityId, cityName) => {
    userService.removeUserCities([cityId]).then((res) => {
      setSelectedCities(selectedCities.filter((city) => city.id !== cityId));
      localStorage.removeItem(`${cityName}CurrentData`);
      localStorage.removeItem(`${cityName}ForecastData`);
      localStorage.removeItem(`${cityName}HistoricData`);
      window.location.reload();
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-burnt-amber text-center mb-5">Weather Dashboard</h1>
      {selectedCities.length > 0 ? (
        <CityWeather
          selectedCities={selectedCities}
          handleDeleteCity={handleDeleteCity}
        />
      ) : (
        <div className="text-center">
          <Spinner color="warning" className="ml-5 mt-5" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
