import axios from "axios";
import authHeader from "./auth-header";

const getCities = () => {
  return axios
    .get("api/cities", { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export default {
  getCities,
};
