import React, { useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Homepage from "./pages/homepage";
import CreatePollPage from "./pages/createPollPage";
import PollPage from "./pages/pollPage";
import PollsListPage from "./pages/pollsListPage";
import UserLoginPage from "./pages/userLoginPage";
import UserRegistrationPage from "./pages/userRegistrationPage";
import UserProfilePage from "./pages/userProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navBar";
import NotFound from "./pages/notFoundPage";
import { useNavigate } from "react-router";
import NotFoundPage from "./pages/notFoundPage";
// import { useNavigate } from "react-router-dom";

function App() {
  const [userIsLogin, setLogin] = useState(
    localStorage.getItem("user") !== null && localStorage.getItem("user") !== "null"
  );

  const userLogout = () => {
    // if(window.location.href==="http://localhost:3000/profile"){
    //   useNavigate("/");
    // }
    localStorage.setItem("user", null);
    setLogin(false);
  };

  // const directToNotFound = () => {
  //   useNavigate("/NotFound");
  // };

  return (
    <div className="App">
      <NavigationBar userIsLogin={userIsLogin} userLogout={userLogout} />
      <main>
        <Container>
          <Router>
            <Routes>
              <Route path="/polls/new-poll" element={<CreatePollPage hasUser={userIsLogin} />} />
              <Route path="/polls/:pollId" element={<PollPage />} />
              <Route path="/polls" element={<PollsListPage />} />
              <Route path="/login" element={<UserLoginPage setLogin={setLogin} />} />
              <Route path="/registration" element={<UserRegistrationPage setLogin={setLogin} />} />
              <Route path="/not-found" element={<NotFound to="/" />} />
              <Route path="/profile" element={userIsLogin ? <UserProfilePage /> : <NotFound to="/" />} />
              <Route path="/" element={<Homepage />} />
              <Route path="*" element={<NotFoundPage to="/" />} />
            </Routes>
          </Router>
        </Container>
      </main>
      <footer>
        <div>Poll Master © 2021</div>
      </footer>
    </div>
  );
}

export default App;
