import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import GuestGreeting from "./guestGreeting";
import UserGreeting from "./userGreeting";
import PropTypes from "prop-types";
import SearchBar from "../searchBar";

const NavigationBar = ({ userIsLogin, userLogout }) => {
  const guestGreeting = <GuestGreeting />;
  const userGreeting = <UserGreeting onLogout={userLogout} />;

  return (
    <Navbar expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Poll Master</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Link className="nav-link" to="/polls">
              All polls
            </Link>
            <Link className="nav-link" to="/polls/new-poll">
              Create poll
            </Link>
            <div className="ms-3">
              <SearchBar />
            </div>
          </Nav>
          {userIsLogin ? userGreeting : guestGreeting}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  userIsLogin: PropTypes.bool.isRequired,
  userLogout: PropTypes.func,
};

export default NavigationBar;
