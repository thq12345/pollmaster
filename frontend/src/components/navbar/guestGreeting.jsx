import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const GuestGreeting = () => {
  return (
    <Nav>
      <Link className="nav-link" to="/login">
        <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
        Sign in
      </Link>
      <Link className="nav-link" to="/registration">
        <FontAwesomeIcon icon={faUserPlus} className="me-1" />
        Sign up
      </Link>
    </Nav>
  );
};

export default GuestGreeting;
