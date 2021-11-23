import React, { useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import CreatePollPage from "./pages/createPollPage";
import PollPage from "./pages/pollPage";
import PollsListPage from "./pages/pollsListPage";
import UserLoginPage from "./pages/userLoginPage";
import UserRegistrationPage from "./pages/userRegistrationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navBar";
import NotFound from "./pages/notFoundPage";

function App() {
  const [userIsLogin, setLogin] = useState(
    sessionStorage.getItem("user") !== null && sessionStorage.getItem("user") !== "null"
  );
  const userLogout = () => {
    sessionStorage.setItem("user", null);
    setLogin(false);
  };

  return (
    <div className="App">
      <NavigationBar userIsLogin={userIsLogin} userLogout={userLogout} />
      <Router>
        <Routes>
          <Route path="/polls/new-poll" element={<CreatePollPage hasUser={userIsLogin} />} />
          <Route path="/polls/:pollId" element={<PollPage />} />
          <Route path="/polls" element={<PollsListPage />} />
          <Route path="/login" element={<UserLoginPage setLogin={setLogin} />} />
          <Route path="/registration" element={<UserRegistrationPage setLogin={setLogin} />} />
          <Route path="/not-found" element={<NotFound to="/" />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
