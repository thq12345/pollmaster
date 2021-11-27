const express = require("express");
const router = express.Router();
const dbManager = require("../db/dbManager");
const { ObjectId } = require("mongodb");

// get all public polls
router.get("/", async (req, res) => {
  let cbChain = {
    // limit: [100],
  };
  let polls = await dbManager.read("polls", { public: true }, cbChain);
  res.json(polls);
});

// search for poll with Id
router.get("/:pollId", async (req, res) => {
  let statusCode = 200;
  let data = {};

  let poll = await dbManager.read("polls", { _id: ObjectId(req.params.pollId) });

  if (poll.length === 0) {
    statusCode = 404;
    data = { message: "Poll not found" };
  }
  data = poll[0];
  res.status(statusCode).json(data);
});

router.get("/:pollId/vote", async (req, res) => {
  let statusCode = 200;
  let message = "Vote requested";
  try {
    let votedOptionIdx = req.query.optionIdx;
    let query = { _id: ObjectId(req.params.pollId) };
    let polls = await dbManager.read("polls", query);
    if (polls.length === 0) {
      statusCode = 404;
      message = "Poll not found";
    }
    let poll = polls[0];
    poll.options[votedOptionIdx].votes += 1;
    poll.totalVotes++;
    await dbManager.update("polls", query, poll);

    // update user voted
    let userId = req.query.userId;
    if (userId !== "null") {
      // update user votedPolls
      let queryFilter = { _id: userId };
      let users = await dbManager.read("users", queryFilter);
      let user = users[0];
      user.votedPolls[req.params.pollId] = Number(votedOptionIdx);
      await dbManager.update("users", queryFilter, user);
    }

    message = "Successfully voted";
  } catch (e) {
    statusCode = 500;
    message = "Vote failed";
  }
  res.status(statusCode).json({ message: message });
});

router.post("/create-poll", async (req, res) => {
  let newPoll = { owner: req.body.owner, title: req.body.title, public: req.body.public === "true" };
  newPoll.options = req.body.options.map((value) => {
    return { prompt: value, votes: 0 };
  });

  let currTime = new Date().getTime();
  newPoll.totalVotes = 0;
  newPoll.createdAt = currTime;
  newPoll.ttl = currTime + 1000 * 60 * 60 * 24 * 30;
  let response = await dbManager.create("polls", newPoll);

  //update user createdPolls
  let queryFilter = { _id: req.body.owner };
  let users = await dbManager.read("users", queryFilter);
  let user = users[0];
  user.createdPolls.push(response.insertedId);
  await dbManager.update("users", queryFilter, user);

  res.json({ message: "Successfully started your poll", newPollId: response.insertedId });
});

module.exports = router;
