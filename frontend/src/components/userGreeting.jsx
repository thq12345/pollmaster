import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserGreeting = (props) => {
  // let user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Nav>
      <Nav.Link href="/profile">My Profile</Nav.Link>
      <Nav.Link onClick={(event) => props.onLogout(event.target)}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sign out
      </Nav.Link>
    </Nav>
  );
};

export default UserGreeting;
