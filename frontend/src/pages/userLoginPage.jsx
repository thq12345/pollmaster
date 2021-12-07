import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import {
  // useNavigate,
  Link,
} from "react-router-dom";
import PropTypes from "prop-types";
import InvalidFeedback from "../components/InvalidFeedback";
import ToastMessage from "../components/toastMessage";
import "../stylesheets/userLoginPage.css";

const UserLoginPage = ({ setLogin }) => {
  // const navigate = useNavigate();
  let [passwordShown, setPasswordShown] = useState(false);
  let [validated, setValidated] = useState(false);
  let [isDisable, setDisableButton] = useState(false);
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;
  let [errorMessage, setMessage] = useState(null);
  let [error, setError] = useState(null);
  let [isInvalid, setInvalid] = useState(false);
  let loginFormRef = useRef();

  //Show password when check box
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  //submit handler
  const submitHandler = async (e) => {
    const form = e.currentTarget;
    setValidated(true);
    setDisableButton(true);
    e.preventDefault();

    //validated form
    if (form.checkValidity() === false) {
      // setDisableButton(false);
      e.stopPropagation();
    } else {
      //create json
      let formData = new FormData(loginFormRef.current);
      let data = {};
      formData.forEach((val, key) => {
        data[key] = val;
      });
      //initialnize the poll
      data["postCreated"] = [];
      let userInput = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //login successful
      if (userInput.ok) {
        let result = await userInput.json();
        localStorage.setItem("user", JSON.stringify(result.user));
        setLogin(true);
        // navigate("/");
        window.history.back();
      } else {
        try {
          let result = await userInput.json();
          setValidated(false);
          setInvalid(true);
          setMessage(result.message);
        } catch (e) {
          setError("Unable to connect server, please try again later");
        }
      }
    }
    setDisableButton(false);
  };

  return (
    <div className="UserLoginPage main-container">
      <h1 className="visually-hidden">User login</h1>
      <Row className="mainRow">
        <Col>
          <div id="loginPurpose" className="main-child">
            <h2>Poll Master</h2>
            <h3>A platform to create and share polls quickly and efficently.</h3>
            <div>Log in to create and keep track of your polls.</div>
          </div>
        </Col>
        <Col>
          <div className="login-form-field main-child">
            <Form className="login-form" noValidate validated={validated} ref={loginFormRef} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  isInvalid={isInvalid}
                  required
                  autoComplete="on"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
                {errorMessage ? (
                  <InvalidFeedback />
                ) : (
                  <InvalidFeedback message="Please enter a correct email address" />
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="userPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    required
                    isInvalid={isInvalid}
                    autoComplete="on"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                  />
                  <Button
                    aria-label={passwordShown ? "hide password" : "show password"}
                    id="eyeButton"
                    onClick={(e) => {
                      togglePassword(e);
                    }}
                  >
                    {eye}
                  </Button>
                  {errorMessage ? <InvalidFeedback message={errorMessage} setMessage={setMessage} /> : null}
                </InputGroup>
                <Form.Control.Feedback type="invalid"> Please enter a correct password</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isDisable}>
                Log In
              </Button>
            </Form>
            {/* <Nav className="create-account"> */}
            <Link to="/registration" id="createAccountText">
              Click to Create an Account
            </Link>
            {/* </Nav> */}
          </div>
        </Col>
      </Row>
      {error ? <ToastMessage show={true} message={error} setMessage={setError} type="Error" /> : null}
    </div>
  );
};

UserLoginPage.propTypes = {
  setLogin: PropTypes.func,
};

export default UserLoginPage;
