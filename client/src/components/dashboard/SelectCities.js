import React, { useState, useEffect, useContext } from "react";
import userService from "../../services/user.service";
import { Form, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

const SelectCities = (props) => {
  const { user } = useContext(UserContext);
  const [allCities, setAllCities] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      userService.getUserCities().then((res) => {
        if (res.data && res.data.length !== 0) {
          history.push("/dashboard");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      userService.getAllCities().then((res) => {
        setAllCities(res.data);
      });
    }
  }, []);

  const handleCheckboxChange = (e) => {
    const id = parseInt(e.target.id);
    if (selectedCities.includes(id)) {
      setSelectedCities(selectedCities.filter((cityId) => cityId !== id));
    } else {
      setSelectedCities([...selectedCities, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    userService
      .addUserCities(selectedCities)
      .then((res) => {
        history.push("/dashboard");
      })
      .catch((err) => {
        setSpinner(false);
      });
  };

  const cityList = allCities.length
    ? allCities.map((city) => {
        return (
          <FormGroup key={city.id} check>
            <Label check>
              <Input
                type="checkbox"
                id={city.id}
                onChange={handleCheckboxChange}
              />
              {city.name}
            </Label>
          </FormGroup>
        );
      })
    : null;

  return (
    <div className="container mt-5">
      <h1 className="text-burnt-amber text-center">Select Cities</h1>
      {allCities.length ? (
        <div className="select-city-container mt-5">
          <h2>City List</h2>
          <p>
            Please select the cities you would like to see weather data for.
          </p>
          <Form onSubmit={handleSubmit}>
            {cityList}
            <>
              <Button
                type="submit"
                className="mt-3 btn-burnt-amber"
                disabled={selectedCities.length === 0}
              >
                Confirm
              </Button>
              {spinner && (
                <Spinner
                  size="sm"
                  color="primary"
                  className="spinner-btn ml-5 mt-5"
                />
              )}
            </>
          </Form>
        </div>
      ) : (
        <div className="text-center">
          <Spinner color="warning" className="ml-5 mt-5" />
        </div>
      )}
    </div>
  );
};

export default SelectCities;
