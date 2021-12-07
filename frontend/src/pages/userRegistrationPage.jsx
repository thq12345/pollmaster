import React, { useState, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import InvalidFeedback from "../components/InvalidFeedback";
import "../stylesheets/registrationPage.css";

const UserRegistrationPage = ({ setLogin }) => {
  let [passwordShown, setPasswordShown] = useState(false);
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;
  let registrationFormRef = useRef();
  let navigate = useNavigate();
  let [errorMessage, setMessage] = useState(null);
  let [isDisable, setDisableButton] = useState(false);
  let [isInvalid, setInvalid] = useState(false);

  //Show password when check box
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  //submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData(registrationFormRef.current);
    setDisableButton(true);
    let data = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });
    let registrationInput = await fetch("/api/users/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (registrationInput.ok) {
      let result = await registrationInput.json();
      let userObejct = {
        firstName: result.user.firstName,
        _id: result.user._id,
      };
      localStorage.setItem("user", JSON.stringify(userObejct));
      setLogin(true);
      navigate("/");
    } else {
      setDisableButton(false);
      let result = await registrationInput.json();
      setMessage(result.message);
      setInvalid(true);
    }
  };

  return (
    <div className="UserRegistrationPage main-container">
      <h1 className="registrationTitle">Registration</h1>

      <Form className="registration-form" ref={registrationFormRef} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="registrationFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control required name="firstName" type="text" placeholder="First Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required name="lastName" type="text" placeholder="Last Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control isInvalid={isInvalid} required name="email" type="email" placeholder="Email Address" />
          {errorMessage ? <InvalidFeedback message={errorMessage} setMessage={setMessage} /> : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationPassword">
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
          <Form.Control.Feedback type="invalid"> Please enter a password</Form.Control.Feedback>
        </Form.Group>
        <Button className="registerButton" variant="primary" type="submit" disabled={isDisable}>
          Create an Account
        </Button>
      </Form>
      <div id="loginText">
        Already have an account?
        <Link to="/login"> Sign in here</Link>
      </div>
    </div>
  );
};

UserRegistrationPage.propTypes = {
  setLogin: PropTypes.func,
};

export default UserRegistrationPage;
