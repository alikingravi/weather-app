import React from "react";
import { ReactComponent as Banner } from "../weather-app.svg";

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <Banner />
      </div>
    </div>
  );
};

export default Home;
