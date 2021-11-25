import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
import PollList from "../components/pollList";

const UserProfilePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const myPolls = user.createdPolls;
  const participatedPolls = user.votedPolls;
  let [myPollList, setPollList] = useState([]);
  let [myParticipatedList, setParticipatedList] = useState([]);

  // const getUserOwnPoll = async () => {
  //   let res = await fetch(`/api/users/userID/ownPoll?_id=${user._id}`);
  //   if (res.ok) {
  //     let json = await res.json();
  //     let pollList = json.filter((el) => myPolls.includes(el._id));
  //     let participatedList = json.filter((el) => participatedPolls.includes(el._id));

  //     setPollList(pollList);
  //     setParticipatedList(participatedList);
  //   }
  // };

  // const getUserVotedPoll = async () => {
  //   let res = await fetch(`/api/users/userID/votedPoll?_id=${user._id}`);
  //   if (res.ok) {
  //     let json = await res.json();
  //     let pollList = json.filter((el) => myPolls.includes(el._id));
  //     let participatedList = json.filter((el) => participatedPolls.includes(el._id));

  //     setPollList(pollList);
  //     setParticipatedList(participatedList);
  //   }
  // };

  // useEffect(() => {
  //   getUserOwnPoll();
  // }, []);

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName} &#39;s Profile
      </h1>
      <h2>My Polls</h2>
      <PollList polls={myPollList} />
      <h2>Participated Polls</h2>
      {/* <PollList polls={myParticipatedList} /> */}
    </div>
  );
};

export default UserProfilePage;
