const express = require("express");
const router = express.Router();
const dbManager = require("../db/dbManager");
const { ObjectId } = require("mongodb");

// get all public polls
router.get("/", async (req, res) => {
  let cbChain = {
    limit: [100],
  };
  let polls = await dbManager.read("Polls", { public: true }, cbChain);
  res.json(polls);
});

// search for poll with Id
router.get("/:pollId", async (req, res) => {
  let statusCode = 200;
  let data = {};

  let poll = await dbManager.read("Polls", { _id: ObjectId(req.params.pollId) });

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
    let polls = await dbManager.read("Polls", query);
    if (polls.length === 0) {
      statusCode = 404;
      message = "Poll not found";
    }
    let poll = polls[0];
    poll.options[votedOptionIdx].votes += 1;
    poll.totalVotes++;
    await dbManager.update("Polls", query, poll);
    // $set: { totalVotes: poll.totalVotes, options: poll.options },

    // let userId = req.query.userId;
    // if (userId) {
    //   // update user votedPolls
    // }

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
  let response = await dbManager.create("Polls", newPoll);
  //update user createdPolls

  res.json({ message: "Successfully started your poll", newPollId: response.insertedId });
});

module.exports = router;
