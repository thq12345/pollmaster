import React from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../stylesheets/pollListItem.css";

const findDaysRemaining = (endTime) => {
  return Math.ceil((endTime - new Date()) / 1000 / 60 / 60 / 24);
};

// const renderDateString = (unixTime) => {
//   return new Date(unixTime).toLocaleDateString();
// };

const PollListItem = ({ onHover, hover, poll, idx }) => {
  let navigate = useNavigate();

  const generateClassName = () => {
    if (findDaysRemaining(Number(poll.ttl)) < 0) return hover ? "expired-hover" : "expired";
    return hover ? " hover" : "";
  };

  return (
    <ListGroup.Item
      className={`PollListItem  ${generateClassName()}`}
      onMouseOver={() => {
        onHover(idx);
      }}
      onClick={() => {
        navigate(`/polls/${poll._id}`);
      }}
    >
      <div>
        <div className="fw-bold inline-block">{poll.title}</div>
        <div className="text-muted inline-block float-right">{poll.totalVotes} people participated</div>
      </div>

      {findDaysRemaining(Number(poll.ttl)) >= 0 ? (
        <div className="text-muted float-right mt-1">Days remaining: {findDaysRemaining(Number(poll.ttl))}</div>
      ) : (
        <div className="text-muted float-right mt-1">expired {-1 * findDaysRemaining(Number(poll.ttl))} day(s) ago</div>
      )}
    </ListGroup.Item>
  );
};

export default PollListItem;
