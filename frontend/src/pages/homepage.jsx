import React from "react";
import "../stylesheets/homepage.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Homepage = () => {
  return (
    <main>
      <Container>
        <h1>Welcompe to poll master!</h1>
        <Row>
          <Col className="homepage-prompt" xs={6}>
            <Link className="btn btn-primary" to="/polls/new-poll">
              Create your own poll
            </Link>
          </Col>
          <Col className="homepage-prompt" xs={6}>
            <Link className="btn btn-primary" to="/polls">
              Join a poll
            </Link>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Homepage;
