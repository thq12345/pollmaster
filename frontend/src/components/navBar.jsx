import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import GuestGreeting from "./guestGreeting";
import UserGreeting from "./userGreeting";

const NavigationBar = () => {
  const styles = {
    userStyle: {
      marginLeft: "0",
    },
  };
  const [userIsLogin, setLogin] = useState(false);
  const changeLoginStatus = () => {
    setLogin(!userIsLogin);
  };
  const guestGreeting = <GuestGreeting />;
  const userGreeting = <UserGreeting onClick={changeLoginStatus} />;

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Poll Master</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/polls/new-poll">Create poll</Nav.Link>
            <Form className="d-flex">
              <Button variant="outline-success">Join</Button>
              <FormControl type="search" placeholder="Poll ID #" className="me-2" aria-label="Search" />
            </Form>
          </Nav>
          {userIsLogin ? userGreeting : guestGreeting}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
