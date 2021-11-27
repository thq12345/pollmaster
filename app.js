const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/users");
const pollsRouter = require("./routes/polls");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use("/api/users", usersRouter);
app.use("/api/polls", pollsRouter);

// routes all 404 back to react
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

module.exports = app;
