import React, { useState, useRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import InvalidFeedback from "../components/InvalidFeedback";
import "../stylesheets/registrationPage.css";
import ToastMessage from "../components/toastMessage";

const UserRegistrationPage = ({ setLogin }) => {
  let [passwordShown, setPasswordShown] = useState(false);
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;
  let registrationFormRef = useRef();
  let navigate = useNavigate();
  let [emailErrorMessage, setEmailErrorMessage] = useState(null);
  let [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  let [isDisable, setDisableButton] = useState(false);
  let [EmailIsInvalid, setEmailInvalid] = useState(false);
  let [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  let [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
  let [lastNameIsInvalid, setLastNameIsInvalid] = useState(false);
  let [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);
  let [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  //Show password when check box
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const clearAllInvalid = () => {
    setPasswordIsInvalid(false);
    setEmailInvalid(false);
    setFirstNameIsInvalid(false);
    setLastNameIsInvalid(false);
    setConfirmPasswordIsInvalid(false);
  };

  //submit handler
  const submitHandler = async (e) => {
    clearAllInvalid();
    e.preventDefault();
    let formData = new FormData(registrationFormRef.current);
    setDisableButton(true);
    let data = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });

    let validFirstName = data.firstName.match(/^[A-Za-z]+$/);
    let validLastName = data.lastName.match(/^[A-Za-z]+$/);
    let strongPassword = data.password.match(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/);
    let machPassword = data.confirmPassword === data.password;
    let inputsValid = validFirstName && validLastName && strongPassword && machPassword;

    setFirstNameIsInvalid(!validFirstName);
    setLastNameIsInvalid(!validLastName);
    if (!machPassword) {
      setConfirmPasswordErrorMessage("Passwords do not match");
      setConfirmPasswordIsInvalid(true);
    }
    if (!strongPassword) {
      setPasswordErrorMessage(
        "Password should be at least 6 character long contain at least one lowercase character, one uppercase character, and one special character"
      );
      setPasswordIsInvalid(true);
    }

    if (!inputsValid) {
      setDisableButton(false);
      return;
    } else {
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
      } else if (registrationInput.status === 400) {
        setDisableButton(false);
        let result = await registrationInput.json();
        setEmailErrorMessage(result.message);
        setEmailInvalid(true);
      } else {
        setDisableButton(false);
        let result = await registrationInput.json();
        setErrorMessage(result.message);
      }
    }
  };

  return (
    <div className="UserRegistrationPage main-container">
      <h1 className="registrationTitle">Registration</h1>

      <Form className="registration-form" ref={registrationFormRef} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="registrationFirstName">
          <Form.Label>First Name*</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              isInvalid={firstNameIsInvalid}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <InvalidFeedback message={"Please enter a valid first name"} />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationLastName">
          <Form.Label>Last Name*</Form.Label>
          <InputGroup hasValidation>
            <Form.Control required isInvalid={lastNameIsInvalid} name="lastName" type="text" placeholder="Last Name" />
            <InvalidFeedback message={"Please enter a valid last name"} />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationEmail">
          <Form.Label>Email*</Form.Label>
          <Form.Control isInvalid={EmailIsInvalid} required name="email" type="email" placeholder="Email Address" />
          {emailErrorMessage ? <InvalidFeedback message={emailErrorMessage} setMessage={setEmailErrorMessage} /> : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationPassword">
          <Form.Label>Password*</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              isInvalid={passwordIsInvalid}
              required
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
            {passwordErrorMessage ? (
              <InvalidFeedback message={passwordErrorMessage} setMessage={setPasswordErrorMessage} />
            ) : null}
          </InputGroup>
          <Form.Control.Feedback type="invalid"> Please enter a password</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmRegistrationPassword">
          <Form.Label>Confirm Password*</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              isInvalid={confirmPasswordIsInvalid}
              autoComplete="off"
              name="confirmPassword"
              type={passwordShown ? "text" : "password"}
              placeholder="Confirm Password"
            />
            {confirmPasswordErrorMessage ? (
              <InvalidFeedback message={confirmPasswordErrorMessage} setMessage={setConfirmPasswordIsInvalid} />
            ) : null}
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
      {errorMessage ? (
        <ToastMessage show={true} message={errorMessage} setMessage={setErrorMessage} type="Error" />
      ) : null}
    </div>
  );
};

UserRegistrationPage.propTypes = {
  setLogin: PropTypes.func,
};

export default UserRegistrationPage;
