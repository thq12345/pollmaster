import React from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/polls/pollListItem.css";
import PropTypes from "prop-types";

const findDaysRemaining = (endTime) => {
  return Math.ceil((endTime - new Date()) / 1000 / 60 / 60 / 24);
};

// const renderDateString = (unixTime) => {
//   return new Date(unixTime).toLocaleDateString();
// };

const PollListItem = ({ onHover, hover, poll, idx }) => {
  let navigate = useNavigate();

  const generateClassName = () => {
    if (findDaysRemaining(poll.ttl) < 0) return hover ? "expired-hover" : "expired";
    return hover ? " hover" : "";
  };

  return (
    <ListGroup.Item
      className={`PollListItem  ${generateClassName()}`}
      onMouseOver={() => {
        onHover(idx);
      }}
      onFocus={() => {
        onHover(idx);
      }}
      action
      tabIndex="0"
      onClick={() => {
        navigate(`/polls/${poll._id}`);
      }}
    >
      <div>
        <div className="fw-bold inline-block">{poll.title}</div>
        <div className="inline-block float-right">{poll.totalVotes} people participated</div>
      </div>

      {findDaysRemaining(poll.ttl) >= 0 ? (
        <div className="float-right mt-1">Days remaining: {findDaysRemaining(poll.ttl)}</div>
      ) : (
        <div className="float-right mt-1">expired {-1 * findDaysRemaining(poll.ttl)} day(s) ago</div>
      )}
    </ListGroup.Item>
  );
};

PollListItem.propTypes = {
  onHover: PropTypes.func,
  hover: PropTypes.bool,
  poll: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        prompt: PropTypes.string,
        votes: PropTypes.number,
      })
    ),
    owner: PropTypes.string,
    totalVotes: PropTypes.number,
    public: PropTypes.bool,
    createdAt: PropTypes.number,
    ttl: PropTypes.number,
  }),
  idx: PropTypes.number,
};

export default PollListItem;
