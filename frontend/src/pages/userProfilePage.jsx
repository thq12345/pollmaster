import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import RenderPollList from "../components/renderPollList";

const UserProfilePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Container>
      <h1>
        {user.firstName} {user.lastName} &#39;s Profile
      </h1>
      <h2>My Polls</h2>
      <RenderPollList />
      <h2>Participated Polls</h2>
    </Container>
  );
};

export default UserProfilePage;
