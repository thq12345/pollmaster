import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const generateGreeting = (firstName) => {
  let time = new Date().getHours();
  let greeting = "Good night";
  if (time < 5) {
    greeting = "Good night";
  } else if (time < 12) {
    greeting = "Good morning";
  } else if (time < 17) {
    greeting = "Good afternoon";
  } else if (time < 20) {
    greeting = "Good evening";
  }
  return `${greeting}, ${firstName}!`;
};

const UserGreeting = ({ onLogout }) => {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <Nav>
      <div style={{ color: "white", alignSelf: "center" }} className="me-3">
        {generateGreeting(user.firstName)}
      </div>
      <Link className="nav-link" to="/profile">
        My Profile
      </Link>
      <Link className="nav-link" to="/" onClick={(event) => onLogout(event.target)}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sign out
      </Link>
    </Nav>
  );
};

UserGreeting.propTypes = {
  onLogout: PropTypes.func,
};

export default UserGreeting;
