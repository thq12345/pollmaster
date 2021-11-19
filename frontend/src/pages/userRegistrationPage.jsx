import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserRegistrationPage = () => {
  const styles = {
    form: {
      border: "2px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "4px",
      padding: "14px 18px",
    },
    mainContainer: {
      width: "500px",
    },
  };
  let registrationFormRef = useRef();
  let navigate = useNavigate();

  //submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData(registrationFormRef.current);

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
      navigate("/");
    }
  };

  return (
    <main>
      <Container style={styles.mainContainer}>
        <h1>Registration</h1>

        <Form style={styles.form} ref={registrationFormRef} onSubmit={submitHandler}>
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

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default UserRegistrationPage;
