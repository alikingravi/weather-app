import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import SelectCities from "./components/dashboard/SelectCities";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/select-cities" component={SelectCities} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
