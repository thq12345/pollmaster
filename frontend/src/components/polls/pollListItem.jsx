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
        navigate(`/polls/${poll._id}`, { state: { backUrl: window.location.href } });
      }}
    >
      <div>
        <div className="inline-block poll-title">{poll.title}</div>
        <div className="inline-block float-right">
          <span className="me-1 numbers">{poll.totalVotes}</span> people participated
        </div>
      </div>

      {findDaysRemaining(poll.ttl) >= 0 ? (
        <div className="float-right mt-1">
          Days remaining: <span className="ms-1 numbers">{findDaysRemaining(poll.ttl)}</span>
        </div>
      ) : (
        <div className="float-right mt-1">
          expired <span className="ms-1 me-1 numbers">{-1 * findDaysRemaining(poll.ttl)}</span> days ago
        </div>
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
