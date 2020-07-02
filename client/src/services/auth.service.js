import axios from "axios";

const register = (user) => {
  return axios.post("/api/register", user);
};

const login = (user) => {
  return axios.post("/api/login", user).then((res) => {
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
