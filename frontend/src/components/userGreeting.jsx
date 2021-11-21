import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserGreeting = (props) => {
  return (
    <Nav>
      <Nav.Link href="">My polls</Nav.Link>
      <Nav.Link onClick={(event) => props.onClick(event.target)}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sign out
      </Nav.Link>
    </Nav>
  );
};

export default UserGreeting;
