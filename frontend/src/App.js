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
// import { useNavigate } from "react-router-dom";

function App() {
  const [userIsLogin, setLogin] = useState(
    sessionStorage.getItem("user") !== null && sessionStorage.getItem("user") !== "null"
  );
  const userLogout = () => {
    sessionStorage.setItem("user", null);
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
            </Routes>
          </Router>
        </Container>
      </main>
    </div>
  );
}

export default App;
