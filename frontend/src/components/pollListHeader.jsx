import React from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/pollListHeader.css";

const PollListHeader = ({ onChangeSortIndex, sortIndex, sortOrder }) => {
  return (
    <ListGroup className="PollListHeader" horizontal style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
      <ListGroup.Item
        action
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
        onClick={() => {
          onChangeSortIndex("ttl");
        }}
      >
        {sortIndex === "ttl" ? (
          <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp} className="me-2" />
        ) : (
          <span className="icon-placeholder"></span>
        )}
        End time
      </ListGroup.Item>
      <ListGroup.Item
        action
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

export default PollListHeader;
