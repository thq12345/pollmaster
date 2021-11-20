import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../components/backButton";

const styles = {
  hover: {
    backgroundColor: "rgba(0, 100, 0, 0.2)",
    padding: "0.5em 1em",
  },
  noHover: {
    padding: "0.5em 1em",
  },
  expired: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "0.5em 1em",
  },
  expiredHover: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "0.5em 1em",
  },
};

const sortFcn = (a, b, sortIndex, order) => {
  return order * (a[sortIndex] - b[sortIndex]);
};

// const sortByStartTime = (a, b, order) => {
//   return order * (a.createdAt - b.createdAt);
// };

// const sortByStartTime = (a, b, order) => {
//   return order * (a.createdAt - b.createdAt);
// };

const renderDateString = (unixTime) => {
  return new Date(unixTime).toLocaleDateString();
};

const findDaysRemaining = (endTime) => {
  return Math.ceil((endTime - new Date()) / 1000 / 60 / 60 / 24);
};

const PollsListPage = () => {
  let [pollList, setPollList] = useState([]);
  let [hoverIdx, setHoverIdx] = useState(-1);
  let [sortIndex, setSortIndex] = useState("ttl");
  let [sortOrder, setSortOrder] = useState(-1);
  let navigate = useNavigate();

  const getPollList = async () => {
    let res = await fetch("/api/polls");
    if (res.ok) {
      let json = await res.json();
      setPollList(json);
    }
  };

  useEffect(() => {
    getPollList();
  }, []);

  const handleHover = (idx) => {
    setHoverIdx(idx);
  };

  const handleChangeSortIndex = (index) => {
    if (index === sortIndex) setSortOrder(-1 * sortOrder);
    setSortIndex(index);
  };

  const generateListItemStyle = (el, idx) => {
    if (findDaysRemaining(Number(el.ttl)) < 0) return hoverIdx === idx ? styles.expiredHover : styles.expired;
    return hoverIdx === idx ? styles.hover : styles.noHover;
  };

  const renderPollList = () => {
    return pollList
      .sort((a, b) => {
        // if (sortIndex === "createdAt") return sortByStartTime(a, b, sortOrder);
        // else if (sortIndex === "votes") return sortByTotalVotes(a, b, sortOrder);
        // else return sortByStartTime(a, b, sortOrder);
        return sortFcn(a, b, sortIndex, sortOrder);
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
            style={generateListItemStyle(el, idx)}
            key={idx}
          >
            <div>
              <div className="fw-bold" style={{ display: "inline-block" }}>
                {el.title}
              </div>
              <div className="text-muted" style={{ display: "inline-block", float: "right" }}>
                {el.totalVotes} people participated
              </div>
            </div>

            {findDaysRemaining(Number(el.ttl)) >= 0 ? (
              <div className="text-muted" style={{ float: "right", marginTop: "0.2em" }}>
                Days remaining: {findDaysRemaining(Number(el.ttl))}
              </div>
            ) : (
              <div className="text-muted" style={{ float: "right", marginTop: "0.2em" }}>
                expired {-1 * findDaysRemaining(Number(el.ttl))} day(s) ago
              </div>
            )}

            {/* <div className="text-muted" style={{ float: "right", marginTop: "0.2em" }}>
              Started on: {renderDateString(Number(el.createdAt))}
            </div> */}

            {/* <div className="text-muted" style={{ float: "right", marginTop: "0.2em" }}>
              Ends on: {renderDateString(Number(el.ttl))}
            </div> */}
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
            {/* <div style={{ display: "inline-flex", marginRight: "1em" }}>Sort</div> */}
            <ListGroup horizontal style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
              <ListGroup.Item
                action
                onClick={() => {
                  handleChangeSortIndex("createdAt");
                }}
              >
                {sortIndex === "createdAt" ? (
                  <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} style={{ marginRight: "0.5em" }} />
                ) : (
                  <span style={{ paddingLeft: "1.4em" }}></span>
                )}
                Start time
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => {
                  handleChangeSortIndex("ttl");
                }}
              >
                {sortIndex === "ttl" ? (
                  <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} style={{ marginRight: "0.5em" }} />
                ) : (
                  <span style={{ paddingLeft: "1.4em" }}></span>
                )}
                End time
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => {
                  handleChangeSortIndex("totalVotes");
                }}
              >
                {sortIndex === "totalVotes" ? (
                  <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} style={{ marginRight: "0.5em" }} />
                ) : (
                  <span style={{ paddingLeft: "1.4em" }}></span>
                )}
                Votes received
              </ListGroup.Item>
            </ListGroup>
          </div>
          <ListGroup>{renderPollList()}</ListGroup>
        </div>
      </Container>
    </main>
  );
};

export default PollsListPage;
