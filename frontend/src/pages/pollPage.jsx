import React, { useEffect, useState } from "react";
import { ListGroup, Button, Row, Col, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import ToastMessage from "../components/toastMessage";
import BackButton from "../components/backButton";
import Loader from "../components/loader";
import SharePollSelections from "../components/polls/sharePoll";
import "../stylesheets/polls/pollPage.css";

const hasExpired = (unixTime) => {
  return unixTime < new Date().getTime();
};

const PollPage = () => {
  let params = useParams();
  let pollId = params.pollId;
  let user = JSON.parse(localStorage.getItem("user"));
  let [poll, setPoll] = useState(null);
  let participatedPolls = user ? user.votedPolls : JSON.parse(localStorage.getItem("participatedPolls"));
  let [updateInterval, setUpdateInterval] = useState(null);
  let votedIdx = participatedPolls && participatedPolls[pollId] !== undefined ? participatedPolls[pollId] : -1;
  let [selectedIdx, setSelectedIdx] = useState(votedIdx);
  let [message, setMessage] = useState(null);
  let [success, setSuccess] = useState(null);
  let [error, setError] = useState(null);
  let [expired, setExpired] = useState(false);
  let [showResult, setShowResult] = useState(false);
  let [disabled, setDisabled] = useState(false);
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
    if ((user && poll && poll.owner === user._id) || votedIdx !== -1) {
      setShowResult(true);
    }
  }, [poll, votedIdx]);

  const autoUpdatePollInfo = (pollId) => {
    if (updateInterval) clearInterval(updateInterval);
    let interval = setInterval(async () => {
      getPollInfo(pollId);
    }, 5000);
    setUpdateInterval(interval);
  };

  useEffect(() => {
    if (showResult || votedIdx !== -1) {
      autoUpdatePollInfo(pollId);
    }
  }, [showResult, pollId, votedIdx]);

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
    setDisabled(true);
    if (selectedIdx === -1) {
      setMessage("Please select one of the options to vote");
      return;
    }
    try {
      let res = await fetch(`/api/polls/${pollId}/vote?optionIdx=${selectedIdx}&userId=${user ? user._id : null}`);
      let json = await res.json();
      if (res.ok) {
        let participated = participatedPolls || {};
        participated[pollId] = selectedIdx;
        if (!user) {
          localStorage.setItem("participatedPolls", JSON.stringify(participated));
        } else {
          let newUser = { ...user };
          newUser.votedPolls = participated;
          localStorage.setItem("user", JSON.stringify(newUser));
        }
        await getPollInfo(pollId);
        setSuccess(json.message);
        setShowResult(true);
      } else {
        setError(json.message);
      }
    } catch (e) {
      setError("Unable to connect to server, please try again later");
    }
    setDisabled(false);
  };

  // Problem: Post deleted but keep render in the backend
  const deletePoll = async () => {
    if (user && poll && poll.owner === user._id) {
      let res = await fetch(`/api/polls/${pollId}`, { method: "delete" });
      if (res.ok) {
        handleRedirect();
        navigate("/polls");
      }
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
          tabIndex={0}
          action
          className={selectedIdx === idx ? "selected-option" : ""}
          onClick={() => {
            handleSelectOption(idx);
          }}
          key={idx}
        >
          <div>{el.prompt}</div>
          {expired || showResult ? (
            <Row>
              <Col className="vote-ratio-bar">
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

  const renderVoteInstruction = () => {
    if (!expired && votedIdx == -1) {
      return <div>To vote: Choose one of the options and click the Submit Vote button.</div>;
    } else {
      return null;
    }
  };

  const renderVoteButton = () => {
    if (expired) {
      return <div style={{ fontSize: "1.5em" }}>This poll has already ended</div>;
    } else if (votedIdx !== -1) {
      return (
        <Button className="voteButton" disabled>
          You have voted
        </Button>
      );
    } else {
      return (
        <Button className="voteButton" disabled={disabled || votedIdx !== -1} onClick={handleVote}>
          Submit Vote
        </Button>
      );
    }
  };

  const renderPoll = () => {
    return (
      <>
        {poll ? (
          <>
            <h1 className="title">{poll.title}</h1>
            <div style={{ width: "70%", margin: "0 auto" }}>{renderVoteInstruction()}</div>
            <div style={{ width: "70%", margin: "0 auto" }}>
              <ListGroup className="mb-2">{poll ? renderPollOptions() : null}</ListGroup>
              {showResult ? <div style={{ float: "right" }}>Total votes: {poll.totalVotes}</div> : null}
              <div style={{ marginTop: "5em" }} className="center">
                {renderVoteButton()}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-center mb-2">Share this poll:</div>
              <div className="center sharePollChoices">
                <SharePollSelections title={poll.title} url={window.location.href} />
              </div>
            </div>
          </>
        ) : (
          <div className="mt-5 text-center">
            <Loader variant="info" />
            <div className="loading-text">Loading poll...</div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="PollPage">
      {/* <div className="back-button"> */}
      <div className="topButtons">
        <BackButton onRedirect={handleRedirect} to="/polls" />
        {user && poll && poll.owner === user._id ? (
          <Button onClick={deletePoll}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete Poll
          </Button>
        ) : null}
      </div>
      {/* </div> */}
      {renderPoll()}
      {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Info" /> : null}
      {success ? <ToastMessage show={true} message={success} setMessage={setSuccess} type="Success" /> : null}
      {error ? <ToastMessage show={true} message={error} setMessage={setError} type="Error" /> : null}
    </div>
  );
};

export default PollPage;
