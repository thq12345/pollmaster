import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
import PollList from "../components/pollList";

const UserProfilePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  let [myPollList, setPollList] = useState([]);
  let [myParticipatedList, setParticipatedList] = useState([]);

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
    <div>
      <h1>
        {user.firstName} {user.lastName} &#39;s Profile
      </h1>
      <h2>My Polls</h2>
      <PollList polls={myPollList} />
      <h2>Participated Polls</h2>
      <PollList polls={myParticipatedList} />
    </div>
  );
};

export default UserProfilePage;
