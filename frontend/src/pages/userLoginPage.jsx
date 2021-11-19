import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Container, Form, InputGroup, Button } from "react-bootstrap";

const UserLoginPage = () => {
  const styles = {
    form: {
      border: "2px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "4px",
      padding: "14px 18px",
    },
    eyeButton: {
      background: "none",
    },
    mainContainer: {
      width: "400px",
    },
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [validated, setValidated] = useState(false);
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;
  let loginFormRef = useRef();

  //Show password when check box
  const togglePassword = (e) => {
    e.preventDefault();

    setPasswordShown(!passwordShown);
  };

  //submit handler
  const submitHandler = async (e) => {
    const form = e.currentTarget;
    //validated form
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      //create json
      let formData = new FormData(loginFormRef.current);
      let data = {};
      formData.forEach((val, key) => {
        data[key] = val;
      });
      let userInput = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //login successful
      if (userInput.ok) {
        let result = await userInput.json();
        sessionStorage.setItem("user", JSON.stringify(result.user));
      } else {
        e.preventDefault();
      }
    }
    setValidated(true);
  };

  return (
    <main>
      <Container style={styles.mainContainer}>
        <h2>Login</h2>
        <Form
          // className={`rounded ${classes.form}`}
          style={styles.form}
          noValidate
          validated={validated}
          ref={loginFormRef}
          onSubmit={submitHandler}
        >
          <Form.Group className="mb-3" controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required autoComplete="on" type="email" name="email" placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">Please enter a correct email address</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                autoComplete="on"
                name="password"
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
              />
              <button
                // id="eyeButton"
                style={styles.eyeButton}
                onClick={(e) => {
                  togglePassword(e);
                }}
              >
                {eye}
              </button>
            </InputGroup>
            <Form.Control.Feedback type="invalid"> Please enter a correct password</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default UserLoginPage;
