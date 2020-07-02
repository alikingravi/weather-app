import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import authService from "../../services/auth.service";
import { UserContext } from "../../contexts/UserContext";

const Register = (props) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) props.history.push("/select-cities");
  }, []);

  const onSubmit = (userData) => {
    setSpinner(true);
    setErrorMessage("");
    authService
      .register(userData)
      .then((res) => {
        props.history.push("/login");
      })
      .catch((err) => {
        const errorObj = err.response.data;
        const error = errorObj[Object.keys(errorObj)[0]][0];
        setErrorMessage(error);
        setSpinner(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-center" sm="12" md="3">
        <Col>
          <h3 className="text-center text-burnt-amber mb-3">Register</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Input
                type="text"
                name="name"
                placeholder="First Name"
                innerRef={register({
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "First Name must be at least 2 characters long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-danger font-weight-light">
                  {errors.name.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="username"
                placeholder="Email"
                innerRef={register({
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.username && (
                <p className="text-danger font-weight-light">
                  {errors.username.message}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                innerRef={register({
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger font-weight-light">
                  {errors.password.message}
                </p>
              )}
            </FormGroup>
            {spinner ? (
              <div className="text-center">
                <Spinner size="lg" color="primary" />
              </div>
            ) : (
              <Button
                type="submit"
                className="btn-burnt-amber btn-block"
                disabled={!isValid}
              >
                Submit
              </Button>
            )}
            {errorMessage && (
              <Alert className="mt-3" color="danger">
                {errorMessage}
              </Alert>
            )}
          </Form>
          <p className="text-center m-5">
            Already have an account?{" "}
            <Link className="text-burnt-amber" to="/login">
              Login
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
