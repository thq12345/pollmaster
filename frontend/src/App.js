import React from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import CreatePollPage from "./pages/createPollPage";
import PollPage from "./pages/pollPage";
import PollsListPage from "./pages/pollsListPage";
import UserLoginPage from "./pages/userLoginPage";
import UserRegistrationPage from "./pages/userRegistrationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navBar";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Router>
        <Routes>
          <Route path="/polls/new-poll" element={<CreatePollPage />} />
          <Route path="/polls/:pollId" element={<PollPage />} />
          <Route path="/polls" element={<PollsListPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/registration" element={<UserRegistrationPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
