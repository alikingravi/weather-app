import axios from "axios";
import authHeader from "./auth-header";

const getAllCities = () => {
  return axios
    .get("api/cities", { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

const getUserCities = () => {
  return axios
    .get("api/user/cities", { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

const addUserCities = (cityIds) => {
  return axios.post("api/user/cities", { cityIds }, { headers: authHeader() });
};

const removeUserCities = (cityIds) => {
  return axios.post(
    "api/user/cities/remove",
    { cityIds },
    {
      headers: authHeader(),
    }
  );
};

export default {
  getAllCities,
  getUserCities,
  addUserCities,
  removeUserCities,
};
