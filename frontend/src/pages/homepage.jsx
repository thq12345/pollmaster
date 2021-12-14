import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PollList from "../components/polls/pollList";
import Loader from "../components/loader";
import "../stylesheets/homepage.css";
import ToastMessage from "../components/toastMessage";

const randomNum = (max) => {
  return Math.floor(Math.random() * max);
};

const Homepage = () => {
  let [pollList, setPollList] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [connected, setConnected] = useState(true);
  const featureNumber = 10;

  const getPollList = async () => {
    try {
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
        setConnected(true);
        setPollList(polls);
      } else {
        setError("Unable to connect to server");
        setConnected(false);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPollList();
  }, []);

  return (
    <div className="Homepage">
      <div>
        <h1 className="title">Welcome to Poll Master!</h1>
        <h2 className="detail"> A platform to create and share polls quickly and efficiently.</h2>
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
      <hr style={{ marginTop: "3em", marginBottom: "3em" }} />

      <h2 className="text-center mb-3">Featured polls</h2>
      {loading && (
        <div className="text-center">
          <Loader />
        </div>
      )}
      {pollList && <PollList polls={pollList} pagesize={5} />}
      {error && <ToastMessage show={true} message={error} setMessage={setError} type="Error" />}
      {!connected && <div className="text-center">Unable to load polls</div>}
    </div>
  );
};

export default Homepage;
