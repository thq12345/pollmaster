import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
import PollList from "../components/pollList";

const UserProfilePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const myPolls = user.createdPolls;
  const participatedPolls = user.votedPolls;
  let [myPollList, setPollList] = useState([]);
  let [myParticipatedList, setParticipatedList] = useState([]);

  const getPollList = async () => {
    let res = await fetch("/api/polls");
    if (res.ok) {
      let json = await res.json();
      let pollList = json.filter((el) => myPolls.includes(el._id));
      let participatedList = json.filter((el) => participatedPolls.includes(el._id));

      setPollList(pollList);
      setParticipatedList(participatedList);
    }
  };

  useEffect(() => {
    getPollList();
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
