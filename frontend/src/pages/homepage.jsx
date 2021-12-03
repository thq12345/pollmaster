import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SearchBar from "../components/searchBar";
import "../stylesheets/homepage.css";

const Homepage = () => {
  return (
    <div className="Homepage">
      <h1 className="title">Welcome to Poll Master!</h1>
      <Row>
        <SearchBar />
      </Row>
      <Row>
        <Col className="prompt" xs={6}>
          <Link className="btn btn-primary" to="/polls/new-poll">
            Create your own poll
          </Link>
        </Col>
        <Col className="prompt" xs={6}>
          <div>
            <Link className="btn btn-primary mb-2" to="/polls">
              Browse a public polls
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
