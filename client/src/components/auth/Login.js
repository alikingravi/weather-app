import React, { useState, useContext, useEffect } from "react";
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
import { ADD_USER } from "../../reducers/types";

const Login = (props) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (user) props.history.push("/select-cities");
  }, []);

  const onSubmit = (userData) => {
    setSpinner(true);
    setErrorMessage("");
    authService.login(userData).then((res) => {
      if (res.status === 401) {
        setErrorMessage(res.message);
        setSpinner(false);
      } else {
        dispatch({ type: ADD_USER, payload: res });
        props.history.push("/select-cities");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-center" sm="12" md="3">
        <Col>
          <h3 className="text-center text-burnt-amber mb-3">Login</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            Don't have an account yet?{" "}
            <Link className="text-burnt-amber" to="/register">
              Register
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
