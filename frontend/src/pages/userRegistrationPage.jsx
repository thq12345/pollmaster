import React, { useState, useRef, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InvalidFeedback from "../components/InvalidFeedback";
import ToastMessage from "../components/toastMessage";
import useRedirect from "../hooks/useRedirect";
import "../stylesheets/registrationPage.css";

// From stack overflow
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const UserRegistrationPage = ({ hasUser, setLogin }) => {
  let [passwordShown, setPasswordShown] = useState(false);
  let [confirmShown, setConfirmShown] = useState(false);
  const passwordEye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;
  const confirmEye = <FontAwesomeIcon icon={confirmShown ? faEye : faEyeSlash} />;
  let registrationFormRef = useRef();
  const redirect = useRedirect();
  let [emailErrorMessage, setEmailErrorMessage] = useState();
  let [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  let [isDisable, setDisableButton] = useState(false);
  let [EmailIsInvalid, setEmailInvalid] = useState(false);
  let [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  let [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
  let [lastNameIsInvalid, setLastNameIsInvalid] = useState(false);
  let [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);
  let [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasUser) {
      redirect();
    }
  });

  //Show password when check box
  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const toggleConfirm = (e) => {
    e.preventDefault();
    setConfirmShown(!confirmShown);
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
    let validEmail = validateEmail(data.email);
    let strongPassword = data.password.match(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/);
    let machPassword = data.confirmPassword === data.password;
    let inputsValid = validFirstName && validLastName && validEmail && strongPassword && machPassword;

    setFirstNameIsInvalid(!validFirstName);
    setLastNameIsInvalid(!validLastName);
    setEmailInvalid(!validEmail);
    if (data.email === "") {
      setEmailErrorMessage("Please enter a valid email");
    } else if (!validEmail) {
      setEmailErrorMessage("Email format incorrect");
    }

    if (!machPassword) {
      setConfirmPasswordErrorMessage("Passwords do not match");
      setConfirmPasswordIsInvalid(true);
    }
    if (!strongPassword) {
      setPasswordErrorMessage(
        "Password should be at least 6 character long contain at least one lowercase character, one uppercase character, and one special character"
      );
      setPasswordIsInvalid(true);
    } else {
      setPasswordErrorMessage(null);
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

      <Form className="registration-form" noValidate ref={registrationFormRef} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="registrationFirstName">
          <Form.Label>
            First Name<span className="required-label">*</span>
          </Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              aria-label="first name"
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
          <Form.Label>
            Last Name<span className="required-label">*</span>
          </Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              aria-label="last name"
              required
              isInvalid={lastNameIsInvalid}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
            <InvalidFeedback message={"Please enter a valid last name"} />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationEmail">
          <Form.Label>
            Email<span className="required-label">*</span>
          </Form.Label>
          <Form.Control
            aria-label="email"
            required
            isInvalid={EmailIsInvalid}
            name="email"
            type="email"
            placeholder="Email Address"
          />
          {emailErrorMessage ? <InvalidFeedback message={emailErrorMessage} setMessage={setEmailErrorMessage} /> : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="registrationPassword">
          <Form.Label>
            Password<span className="required-label">*</span>
          </Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              aria-label="password"
              required
              isInvalid={passwordIsInvalid}
              autoComplete="on"
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
            />
            <Button
              aria-label={passwordShown ? "hide password" : "show password"}
              className="eyeButton"
              onClick={(e) => {
                togglePassword(e);
              }}
            >
              {passwordEye}
            </Button>
            {passwordErrorMessage ? (
              <InvalidFeedback message={passwordErrorMessage} setMessage={setPasswordErrorMessage} />
            ) : (
              <Form.Text>
                Password should be at least 6 character long contain at least one lowercase character, one uppercase
                character, and one special character
              </Form.Text>
            )}
          </InputGroup>
          <Form.Control.Feedback type="invalid"> Please enter a password</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmRegistrationPassword">
          <Form.Label>
            Confirm Password<span className="required-label">*</span>
          </Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              aria-label="confirm password"
              required
              isInvalid={confirmPasswordIsInvalid}
              autoComplete="off"
              name="confirmPassword"
              type={confirmShown ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <Button
              aria-label={confirmShown ? "hide confirmed password" : "show confirmed password"}
              className="eyeButton"
              onClick={(e) => {
                toggleConfirm(e);
              }}
            >
              {confirmEye}
            </Button>
            {confirmPasswordErrorMessage ? (
              <InvalidFeedback message={confirmPasswordErrorMessage} setMessage={setConfirmPasswordIsInvalid} />
            ) : null}
          </InputGroup>
          <Form.Control.Feedback type="invalid"> Please confirm your password</Form.Control.Feedback>
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
  hasUser: PropTypes.bool,
  setLogin: PropTypes.func,
};

export default UserRegistrationPage;
