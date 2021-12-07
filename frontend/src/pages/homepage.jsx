import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// import PollCarousel from "../components/polls/pollCarousel";
import PollList from "../components/polls/pollList";
import Loader from "../components/loader";
import "../stylesheets/homepage.css";

const randomNum = (max) => {
  return Math.floor(Math.random() * max);
};

const Homepage = () => {
  let [pollList, setPollList] = useState(null);
  let [loading, setLoading] = useState(false);
  const featureNumber = 10;

  const getPollList = async () => {
    let res = await fetch("/api/polls");
    if (res.ok) {
      let json = await res.json();

      json = json.filter((el) => {
        return new Date().getTime() - el.ttl < 0;
      });

      let polls = [];
      for (let i = 0; i < featureNumber; i++) {
        polls.push(json[randomNum(json.length)]);
      }

      setPollList(polls);
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

      {/* {pollList && <PollCarousel polls={pollList} />} */}
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
      <hr style={{ marginTop: "3em", marginBottom: "3em" }} />

      <h2 className="text-center mb-3">Featured polls</h2>
      {loading && (
        <div className="text-center">
          <Loader variant="info" />
        </div>
      )}
      {/* {pollList && <PollCarousel polls={pollList} />} */}
      {pollList ? <PollList polls={pollList} pagesize={5} /> : <div className="text-center">Unable to load list</div>}
    </div>
  );
};

export default Homepage;
