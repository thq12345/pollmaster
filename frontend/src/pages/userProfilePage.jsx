import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
import PollList from "../components/polls/pollList";

const UserProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let [myPollList, setPollList] = useState([]);
  let [myParticipatedList, setParticipatedList] = useState([]);
  const pageSize = 10;

  const getUserOwnPoll = async () => {
    let res = await fetch(`/api/users/${user._id}`);
    if (res.ok) {
      //this returs an array [createdPoll, votedPolls]
      let polls = await res.json();
      setPollList(polls.ownPolls);
      setParticipatedList(polls.votedPolls);
    }
  };
  useEffect(() => {
    getUserOwnPoll();
  }, []);

  return (
    <div className="containerDiv">
      <h1 className="profileTitle">
        {user.firstName} {user.lastName}&#39;s Profile
        <hr className="nameDivider"></hr>
      </h1>

      <h2 className="profileTitle">My Polls</h2>
      <PollList pagesize={pageSize} polls={myPollList} />
      <h2 className="profileTitle">Participated Polls</h2>
      <PollList pagesize={pageSize} polls={myParticipatedList} />
    </div>
  );
};

export default UserProfilePage;
