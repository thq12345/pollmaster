import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ToastMessage from "../components/toastMessage";
import "../stylesheets/pollPage.css";

const PollPage = () => {
  let params = useParams();
  let [poll, setPoll] = useState(null);
  let [selectedIdx, setSelectedIdx] = useState(-1);
  let [message, setMessage] = useState(null);

  // get poll data
  useEffect(async () => {
    let res = await fetch(`/api/polls/${params.pollId}`);
    if (res.ok) {
      let json = await res.json();
      setPoll(json);
    }
  }, [params]);

  const handleSelectOption = (idx) => {
    setSelectedIdx(idx);
  };

  const handleVote = async () => {
    let res = await fetch(`/api/polls/${params.pollId}/vote?optionIdx=${selectedIdx}`);
    if (res.ok) {
      let json = await res.json();
      setMessage(json.message);
    }
  };

  const renderPollOptions = () => {
    return poll.options.map((el, idx) => {
      return (
        <ListGroup.Item
          id={selectedIdx === idx ? "selectedOption" : null}
          onClick={() => {
            handleSelectOption(idx);
          }}
          key={idx}
        >
          {el.prompt}
        </ListGroup.Item>
      );
    });
  };

  return (
    <main>
      <Container>
        <h1>{poll ? poll.title : "This is a poll page"}</h1>
        <div style={{ width: "70%", margin: "0 auto" }}>
          <ListGroup style={{ marginBottom: "2em" }}>{poll ? renderPollOptions() : null}</ListGroup>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleVote}>Vote</Button>
          </div>
        </div>
        {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Success" /> : null}
      </Container>
    </main>
  );
};

export default PollPage;
