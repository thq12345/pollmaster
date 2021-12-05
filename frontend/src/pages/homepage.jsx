import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../stylesheets/homepage.css";

const Homepage = () => {
  return (
    <div className="Homepage">
      <h1 className="title">Welcome to Poll Master!</h1>
      <h2 className="detail"> A platform to create and share polls quickly and efficently.</h2>
      <div className="detail">***Maybe a video example of creating a poll***</div>
      <Row>
        <Col className="prompt" xs={6}>
          <Link className="btn btn-primary" to="/polls/new-poll">
            Create Your Own Poll
          </Link>
        </Col>
        <Col className="prompt" xs={6}>
          <div>
            <Link className="btn btn-primary mb-2" to="/polls">
              Browse Public Polls
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
