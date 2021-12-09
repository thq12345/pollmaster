import React from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/polls/pollListHeader.css";
import PropTypes from "prop-types";

const PollListHeader = ({ onChangeSortIndex, sortIndex, sortOrder }) => {
  const generateLabel = (index) => {
    if (sortIndex === index) {
      if (sortOrder === -1) return "currently sorted descending";
      else return "currently sorted ascending";
    } else return "currently not sorted";
  };
  return (
    <ListGroup className="PollListHeader" horizontal style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
      <ListGroup.Item
        action
        aria-label={`sort by start time, ${generateLabel("createdAt")}`}
        onClick={() => {
          onChangeSortIndex("createdAt");
        }}
      >
        {sortIndex === "createdAt" ? (
          <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} className="me-2" />
        ) : (
          <span className="icon-placeholder"></span>
        )}
        Start time
      </ListGroup.Item>
      <ListGroup.Item
        action
        aria-label={`sort by expiration time, ${generateLabel("ttl")}`}
        onClick={() => {
          onChangeSortIndex("ttl");
        }}
      >
        {sortIndex === "ttl" ? (
          <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} className="me-2" />
        ) : (
          <span className="icon-placeholder"></span>
        )}
        Expiration time
      </ListGroup.Item>
      <ListGroup.Item
        action
        aria-label={`sort by total votes, ${generateLabel("totalVotes")}`}
        onClick={() => {
          onChangeSortIndex("totalVotes");
        }}
      >
        {sortIndex === "totalVotes" ? (
          <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} className="me-2" />
        ) : (
          <span className="icon-placeholder"></span>
        )}
        Votes received
      </ListGroup.Item>
    </ListGroup>
  );
};

PollListHeader.propTypes = {
  onChangeSortIndex: PropTypes.func,
  sortIndex: PropTypes.string,
  sortOrder: PropTypes.number,
};

export default PollListHeader;
