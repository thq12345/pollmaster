import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const generateGreeting = (firstName) => {
  let time = new Date().getHours();
  if (time < 5) {
    return `Go back to sleep, ${firstName}!`;
  }
  if (time < 7) {
    return `Hi, ${firstName}! You are up early!`;
  }
  if (time < 12) {
    return `Good morning, ${firstName}!`;
  }
  if (time == 12) {
    return `Go eat lunch, ${firstName}!`;
  }
  if (time < 17) {
    return `Good afternoon, ${firstName}!`;
  }
  if (time < 20) {
    return `Good evening, ${firstName}!`;
  }
  return `Good night, ${firstName}!`;
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
