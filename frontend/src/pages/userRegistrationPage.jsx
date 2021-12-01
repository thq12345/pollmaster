import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ToastMessage from "../components/toastMessage";

const UserRegistrationPage = ({ setLogin }) => {
  const styles = {
    form: {
      border: "2px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "4px",
      padding: "14px 18px",
    },
    mainContainer: {
      margin: "0 auto",
      width: "500px",
    },
  };
  let registrationFormRef = useRef();
  let navigate = useNavigate();
  let [errorMessage, setMessage] = useState(null);
  let [isDisable, setDisableButton] = useState(false);

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
      sessionStorage.setItem("user", JSON.stringify(userObejct));
      setLogin(true);
      navigate("/");
    } else {
      setDisableButton(false);
      let result = await registrationInput.json();
      setMessage(result.message);
    }
  };

  return (
    <div style={styles.mainContainer}>
      <h1>Registration</h1>

      <Form style={styles.form} ref={registrationFormRef} onSubmit={submitHandler}>
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
          <Form.Control required name="email" type="email" placeholder="Email Address" />
        </Form.Group>

        <Form.Group controlId="registrationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required name="password" type="password" autoComplete="off" />
        </Form.Group>
        <Form.Group className="mb-3" id="checkbox">
          <Form.Check required type="checkbox" label="Im not gonna do illegal stuff" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isDisable}>
          Register
        </Button>
      </Form>
      {errorMessage ? (
        <ToastMessage show={true} message={errorMessage} setMessage={setMessage} type={"Error"} delay={10000} />
      ) : null}
    </div>
  );
};

UserRegistrationPage.propTypes = {
  setLogin: PropTypes.func,
};

export default UserRegistrationPage;
