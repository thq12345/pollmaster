import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import ToastMessage from "../components/toastMessage";
// import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
// import useLocalStorage from "../hooks/useLocalStorage";

const styles = {
  title: {
    textAlign: "center",
    marginBottom: "1em",
  },
  selectedOption: {
    backgroundColor: "rgba(0, 100, 150, 0.3)",
  },
  voteCount: { display: "inline-block", float: "right" },
  backButton: {
    marginLeft: "2em",
  },
};

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
  let [expired, setExpired] = useState(false);

  const getPollInfo = async (pollId) => {
    let res = await fetch(`/api/polls/${pollId}`);
    if (res.ok) {
      let json = await res.json();
      setPoll(json);
      setExpired(hasExpired(json.ttl));
    }
  };

  // get poll info on page load
  useEffect(() => {
    getPollInfo(pollId);
  }, []);

  useEffect(() => {
    // if (updateInterval) clearInterval(updateInterval);
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
    let res = await fetch(`/api/polls/${pollId}/vote?optionIdx=${selectedIdx}`);
    if (res.ok) {
      let participated = participatedPolls || {};
      participated[pollId] = selectedIdx;
      localStorage.setItem("participatedPolls", JSON.stringify(participated));
      let json = await res.json();
      await getPollInfo(pollId);
      setSuccess(json.message);
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
          style={selectedIdx === idx ? styles.selectedOption : null}
          onClick={() => {
            handleSelectOption(idx);
          }}
          key={idx}
        >
          <div>{el.prompt}</div>
          {expired || votedIdx !== -1 ? (
            <Row>
              <Col style={{ padding: "5px 0 5px 1em" }}>
                <ProgressBar now={votesRatio[idx]} style={{ height: "100%" }} />
              </Col>
              <Col xs={1}>
                <div style={styles.voteCount}>{el.votes}</div>
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

  return (
    <main>
      <Container>
        <div style={styles.backButton}>
          <BackButton onRedirect={handleRedirect} to="/polls" />
        </div>
        <h1 style={styles.title}>{poll ? poll.title : "This is a poll page"}</h1>
        <div style={{ width: "70%", margin: "0 auto" }}>
          <ListGroup style={{ marginBottom: "2em" }}>{poll ? renderPollOptions() : null}</ListGroup>
          <div style={{ display: "flex", justifyContent: "center" }}>{renderVoteButton()}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3em" }}>
          <div>
            <div style={{ textAlign: "center" }}>Share this poll:</div>

            <div>{window.location.href}</div>
            <Button
              style={{ padding: "0 0.5em", marginLeft: "47%" }}
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
              }}
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>
          </div>
        </div>
        {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Info" /> : null}
        {success ? <ToastMessage show={true} message={success} setMessage={setSuccess} type="Success" /> : null}
      </Container>
    </main>
  );
};

export default PollPage;
