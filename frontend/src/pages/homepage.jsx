import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PollCarousel from "../components/polls/pollCarousel";
import "../stylesheets/homepage.css";

const Homepage = () => {
  let [pollList, setPollList] = useState(null);
  let [loading, setLoading] = useState(false);

  const getPollList = async () => {
    let res = await fetch("/api/polls");
    if (res.ok) {
      let json = await res.json();
      setPollList(json);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPollList();
  }, []);

  return (
    <div className="Homepage">
      <h1 className="title">Welcome to Poll Master!</h1>
      <h2 className="detail"> A platform to create and share polls quickly and efficently.</h2>
      <div className="detail">***Maybe a video example of creating a poll***</div>

      {pollList && <PollCarousel polls={pollList} />}
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
