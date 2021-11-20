import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import BackButton from "../components/backButton";

const styles = {
  hover: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "1em 1em",
  },
  noHover: {
    padding: "1em 1em",
  },
};

const sortByTotalVotes = (a, b, order) => {
  return order * a.totalVotes - b.totalVotes;
};

const sortByTime = (a, b, order) => {
  return order * a.createdAt - b.createdAt;
};

const PollsListPage = () => {
  let [pollList, setPollList] = useState([]);
  let [hoverIdx, setHoverIdx] = useState(-1);
  let [sortIndex, setSortIdx] = useState("votes");
  let [sortOrder, setSortOrder] = useState(-1);
  let navigate = useNavigate();

  const getPollList = async () => {
    let res = await fetch("/api/polls");
    if (res.ok) {
      let json = await res.json();
      setPollList(json);
    }
  };

  const handleHover = (idx) => {
    setHoverIdx(idx);
  };

  useEffect(() => {
    getPollList();
  }, []);

  const renderPollList = () => {
    return pollList
      .sort((a, b) => {
        return sortIndex === "time" ? sortByTime(a, b, sortOrder) : sortByTotalVotes(a, b, sortOrder);
      })
      .map((el, idx) => {
        return (
          <ListGroup.Item
            onMouseOver={() => {
              handleHover(idx);
            }}
            onClick={() => {
              navigate(`/polls/${el._id}`);
            }}
            style={hoverIdx === idx ? styles.hover : styles.noHover}
            key={idx}
          >
            <div className="fw-bold" style={{ display: "inline-block" }}>
              {el.title}
            </div>
            <div className="text-muted ms-3" style={{ display: "inline-block", float: "right" }}>
              {el.totalVotes} people participated
            </div>
          </ListGroup.Item>
        );
      });
  };

  return (
    <main>
      <Container>
        <div style={{ marginLeft: "2em" }}>
          <BackButton to="/" />
        </div>
        <h1 style={{ textAlign: "center" }}>Vote in some of the polls</h1>
        <hr className="mb-5" />
        <div style={{ width: "70%", margin: "0 auto" }}>
          <div>
            <div style={{ display: "inline-flex", marginRight: "1em" }}>Sort</div>
            <ListGroup horizontal style={{ display: "inline-flex" }}>
              <ListGroup.Item>Time</ListGroup.Item>
              <ListGroup.Item>Total Votes</ListGroup.Item>
            </ListGroup>
          </div>
          <ListGroup>{renderPollList()}</ListGroup>
        </div>
      </Container>
    </main>
  );
};

export default PollsListPage;
