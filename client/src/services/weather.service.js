import axios from "axios";

const getCurrentWeather = async (cityName, country) => {
  const url = `api/country/${country}/city/${cityName}/current`;
  let error = "",
    currentWeather;

  try {
    currentWeather = await axios.get(url);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return error;
  }

  return currentWeather;
};

const getForecastWeather = async (cityName, country) => {
  const url = `api/country/${country}/city/${cityName}/forecast`;
  let error = "",
    forecastWeather;

  try {
    forecastWeather = await axios.get(url);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return error;
  }

  return forecastWeather;
};

const getHistoricWeather = async (cityName, country) => {
  const url = `api/country/${country}/city/${cityName}/historic`;
  let error = "",
    historicWeather;

  try {
    historicWeather = await axios.get(url);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return error;
  }

  return historicWeather;
};

/**
 * Set a time tracker in localstorage
 * Api calls to 3rd parties will be made once every 10 mins
 */
const setTimeTracker = () => {
  const now = new Date();
  const localTime = JSON.parse(localStorage.getItem("time"));
  if (localTime) {
    const minutesDiff =
      (now.getTime() - new Date(localTime).getTime()) / 1000 / 60;
    if (minutesDiff > 10) {
      localStorage.setItem("time", JSON.stringify(new Date()));
    }
  } else {
    localStorage.setItem("time", JSON.stringify(new Date()));
  }
};

const compareLocalDataTime = () => {
  const now = new Date();
  const localStorageDate = JSON.parse(localStorage.getItem("time"));
  if (localStorageDate) {
    const minutesDiff =
      (now.getTime() - new Date(localStorageDate).getTime()) / 1000 / 60;
    return minutesDiff < 10;
  }
  return false;
};

export default {
  getCurrentWeather,
  getForecastWeather,
  getHistoricWeather,
  setTimeTracker,
  compareLocalDataTime,
};
