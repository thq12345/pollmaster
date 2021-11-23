import React, { useEffect, useState } from "react";
import { ListGroup, Button, Row, Col, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import ToastMessage from "../components/toastMessage";
import BackButton from "../components/backButton";
import "../stylesheets/pollPage.css";
// import useLocalStorage from "../hooks/useLocalStorage";

const hasExpired = (unixTime) => {
  return unixTime < new Date().getTime();
};

const PollPage = () => {
  let params = useParams();
  let pollId = params.pollId;
  let user = null;
  let [poll, setPoll] = useState(null);
  let participatedPolls = user ? user.participatedPolls : JSON.parse(localStorage.getItem("participatedPolls"));
  let [updateInterval, setUpdateInterval] = useState(null);
  let votedIdx = participatedPolls && participatedPolls[pollId] !== undefined ? participatedPolls[pollId] : -1;
  let [selectedIdx, setSelectedIdx] = useState(votedIdx);
  let [message, setMessage] = useState(null);
  let [success, setSuccess] = useState(null);
  let [error, setError] = useState(null);
  let [expired, setExpired] = useState(false);
  let navigate = useNavigate();

  const getPollInfo = async (pollId) => {
    try {
      let res = await fetch(`/api/polls/${pollId}`);
      if (res.ok) {
        let json = await res.json();
        setPoll(json);
        setExpired(hasExpired(json.ttl));
      } else {
        if (res.status === 404) {
          navigate("/not-found");
        } else {
          setError("Server connection lost");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  // get poll info on page load
  useEffect(() => {
    getPollInfo(pollId);
  }, []);

  useEffect(() => {
    if (votedIdx !== -1) {
      autoUpdatePollInfo(pollId);
    }
  }, [pollId, votedIdx]);

  const autoUpdatePollInfo = (pollId) => {
    let interval = setInterval(async () => {
      getPollInfo(pollId);
    }, 5000);
    setUpdateInterval(interval);
  };

  const handleSelectOption = (idx) => {
    if (expired || votedIdx !== -1) return;
    setSelectedIdx(idx);
  };

  const handleRedirect = () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      setUpdateInterval(null);
    }
  };

  const handleVote = async () => {
    if (selectedIdx === -1) {
      setMessage("Please select one of the options to vote");
      return;
    }
    try {
      let res = await fetch(`/api/polls/${pollId}/vote?optionIdx=${selectedIdx}`);
      if (res.ok) {
        let participated = participatedPolls || {};
        participated[pollId] = selectedIdx;
        localStorage.setItem("participatedPolls", JSON.stringify(participated));
        let json = await res.json();
        await getPollInfo(pollId);
        setSuccess(json.message);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const renderPollOptions = () => {
    let totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);
    let votesRatio = poll.options.map((el) => {
      return Math.round((el.votes * 100) / totalVotes);
    });
    return poll.options.map((el, idx) => {
      return (
        <ListGroup.Item
          className={selectedIdx === idx ? "selected-option" : ""}
          onClick={() => {
            handleSelectOption(idx);
          }}
          key={idx}
        >
          <div>{el.prompt}</div>
          {expired || votedIdx !== -1 ? (
            <Row>
              <Col style={{ padding: "5px 0 5px 1em" }}>
                <ProgressBar now={votesRatio[idx]} />
              </Col>
              <Col xs={1}>
                <div className="vote-count">{el.votes}</div>
              </Col>
            </Row>
          ) : null}
        </ListGroup.Item>
      );
    });
  };

  const renderVoteButton = () => {
    if (expired) {
      return <div style={{ fontSize: "1.5em" }}>This poll has already ended</div>;
    } else if (votedIdx !== -1) {
      return <Button disabled>You have voted</Button>;
    } else {
      return (
        <Button disabled={votedIdx !== -1} onClick={handleVote}>
          Vote
        </Button>
      );
    }
  };

  const renderPoll = () => {
    return (
      <>
        <h1 className="title">{poll ? poll.title : "This is a poll page"}</h1>
        <div style={{ width: "70%", margin: "0 auto" }}>
          <ListGroup className="mb-5">{poll ? renderPollOptions() : null}</ListGroup>
          <div className="center">{renderVoteButton()}</div>
        </div>
        <div className="center mt-5">
          <div>
            <div style={{ textAlign: "center" }}>Share this poll:</div>

            <div>{window.location.href}</div>
            <Button
              className="copy-poll-link-button"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
              }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="PollPage">
      <div className="back-button">
        <BackButton onRedirect={handleRedirect} to="/polls" />
      </div>
      {renderPoll()}
      {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Info" /> : null}
      {success ? <ToastMessage show={true} message={success} setMessage={setSuccess} type="Success" /> : null}
      {error ? <ToastMessage show={true} message={error} setMessage={setError} type="Error" /> : null}
    </div>
  );
};

export default PollPage;
