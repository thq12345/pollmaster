import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
import PollList from "../components/pollList";

const UserProfilePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  let [pollList, setPollList] = useState([]);

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

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName} &#39;s Profile
      </h1>
      <h2>My Polls</h2>
      <PollList polls={pollList} />
      <h2>Participated Polls</h2>
    </div>
  );
};

export default UserProfilePage;
