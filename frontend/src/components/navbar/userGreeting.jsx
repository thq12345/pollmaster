import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const UserGreeting = ({ onLogout }) => {
  return (
    <Nav>
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
