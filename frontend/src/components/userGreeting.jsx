import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const UserGreeting = (props) => {
  // let user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Nav>
      <Nav.Link href="/profile">My Profile</Nav.Link>
      <Nav.Link href="/" onClick={(event) => props.onLogout(event.target)}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sign out
      </Nav.Link>
    </Nav>
  );
};

UserGreeting.propTypes = {
  props: PropTypes.func,
  onLogout: PropTypes.func,
};

export default UserGreeting;
