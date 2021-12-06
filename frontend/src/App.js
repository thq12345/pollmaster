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
import NavigationBar from "./components/navbar/navBar";
import NotFound from "./pages/notFoundPage";
import { useNavigate } from "react-router";
import NotFoundPage from "./pages/notFoundPage";
import NeedPermissionPage from "./pages/needPermissionPage";

function App() {
  const [userIsLogin, setLogin] = useState(
    localStorage.getItem("user") !== null && localStorage.getItem("user") !== "null"
  );

  const userLogout = () => {
    localStorage.setItem("user", null);
    useNavigate("/");
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
              <Route path="/profile" element={userIsLogin ? <UserProfilePage /> : <NeedPermissionPage to="/" />} />
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
