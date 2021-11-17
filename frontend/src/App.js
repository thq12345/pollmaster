import React from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import CreatePoll from "./pages/createPoll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/polls/new-poll" element={<CreatePoll />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
