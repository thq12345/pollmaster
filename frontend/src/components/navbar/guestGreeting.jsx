import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const GuestGreeting = () => {
  return (
    <Nav>
      <Nav.Link href="/login">
        <FontAwesomeIcon icon={faSignInAlt} /> Sign in
      </Nav.Link>
      <Nav.Link href="/registration">
        <FontAwesomeIcon icon={faUserPlus} />
        Sign up
      </Nav.Link>
    </Nav>
  );
};

export default GuestGreeting;
