import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ToastMessage from "../components/toastMessage";
// import useLocalStorage from "../hooks/useLocalStorage";

const PollPage = () => {
  const styles = {
    title: {
      textAlign: "center",
    },
    selectedOption: {
      backgroundColor: "rgba(0, 100, 150, 0.3)",
    },
    voteCount: { display: "inline-block", float: "right" },
  };

  let params = useParams();
  let pollId = params.pollId;
  let user = null;
  let [poll, setPoll] = useState(null);
  let participatedPolls = user ? user.participatedPolls : JSON.parse(localStorage.getItem("participatedPolls"));
  // let [updateInterval, setUpdateInterval] = useState(null);
  let votedIdx = participatedPolls && participatedPolls[pollId] !== undefined ? participatedPolls[pollId] : -1;
  let [selectedIdx, setSelectedIdx] = useState(votedIdx);
  let [message, setMessage] = useState(null);

  const getPollInfo = async (pollId) => {
    let res = await fetch(`/api/polls/${pollId}`);
    if (res.ok) {
      let json = await res.json();
      setPoll(json);
    }
  };

  // get poll info on page load
  useEffect(() => {
    getPollInfo(pollId);
    // setUpdateInterval(null);
  }, []);

  useEffect(() => {
    // if (updateInterval) clearInterval(updateInterval);
    if (votedIdx !== -1) {
      autoUpdatePollInfo(pollId);
    }
  }, [pollId, votedIdx]);

  const autoUpdatePollInfo = (pollId) => {
    setInterval(async () => {
      getPollInfo(pollId);
    }, 5000);
    // setUpdateInterval(interval);
  };

  const handleSelectOption = (idx) => {
    if (votedIdx !== -1) return;
    setSelectedIdx(idx);
  };

  const handleVote = async () => {
    if (selectedIdx === -1) return;
    let res = await fetch(`/api/polls/${pollId}/vote?optionIdx=${selectedIdx}`);
    if (res.ok) {
      let participated = participatedPolls || {};
      participated[pollId] = selectedIdx;
      localStorage.setItem("participatedPolls", JSON.stringify(participated));
      let json = await res.json();
      await getPollInfo(pollId);
      setMessage(json.message);
    }
  };

  const renderPollOptions = () => {
    return poll.options.map((el, idx) => {
      return (
        <ListGroup.Item
          style={selectedIdx === idx ? styles.selectedOption : null}
          onClick={() => {
            handleSelectOption(idx);
          }}
          key={idx}
        >
          <div style={{ display: "inline-block" }}>{el.prompt}</div>
          {votedIdx !== -1 ? <div style={styles.voteCount}>{el.votes}</div> : null}
        </ListGroup.Item>
      );
    });
  };

  return (
    <main>
      <Container>
        <h1 style={styles.title}>{poll ? poll.title : "This is a poll page"}</h1>
        <div style={{ width: "70%", margin: "0 auto" }}>
          <ListGroup style={{ marginBottom: "2em" }}>{poll ? renderPollOptions() : null}</ListGroup>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button disabled={votedIdx !== -1} onClick={handleVote}>
              Vote
            </Button>
          </div>
        </div>
        {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Success" /> : null}
      </Container>
    </main>
  );
};

export default PollPage;
