const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const pollsRaw = require("../poll master.json");

let polls = pollsRaw.map((el) => {
  let options = [];
  let totalVotes = 0;
  for (let i = 1; i < 6; i++) {
    if (el[`option${i}`]) {
      options.push({ prompt: el[`option${i}`], votes: el[`option${i}Vote`] });
      totalVotes += el[`option${i}Vote`];
    }
  }
  return {
    _id: el._id,
    title: el.title,
    options: options,
    totalVotes: totalVotes,
    public: el.public,
    createdAt: el.createdAt,
    ttl: el.ttl,
  };
});

// let polls = [
//   {
//     _id: "123",
//     title: "test poll1",
//     options: [
//       { prompt: "option1", votes: 0 },
//       { prompt: "option2", votes: 3 },
//     ],
//   },
//   {
//     _id: "sampleId2",
//     title: "test poll2",
//     options: [
//       { prompt: "option1", votes: 3 },
//       { prompt: "option2", votes: 5 },
//     ],
//   },
// ];

router.get("/", (req, res) => {
  res.json(polls.filter((el) => el.public === true));
});

// search for poll with Id
router.get("/:pollId", (req, res) => {
  let statusCode = 200;
  let data = {};

  let poll = polls.filter((el) => {
    return el._id === req.params.pollId;
  });

  if (poll.length === 0) {
    statusCode = 404;
    data = { message: "Poll not found" };
  }
  data = poll[0];
  res.status(statusCode).json(data);
});

router.get("/:pollId/vote", (req, res) => {
  let statusCode = 200;
  let message = "Vote requested";
  try {
    let votedOptionIdx = req.query.optionIdx;
    for (let i = 0; i < polls.length; i++) {
      if (polls[i]._id === req.params.pollId) {
        polls[i].options[votedOptionIdx].votes += 1;
        polls[i].totalVotes++;
      }
    }
    message = "Successfully voted";
  } catch (e) {
    statusCode = 500;
    message = "Vote failed";
  }
  res.status(statusCode).json({ message: message });
});

router.post("/create-poll", (req, res) => {
  let newPoll = { owner: req.body.owner, title: req.body.title, public: req.body.public === "true" };
  newPoll.options = req.body.options.map((value) => {
    return { prompt: value, votes: 0 };
  });
  newPoll._id = uuid();

  let currTime = new Date().getTime();
  newPoll.createdAt = currTime;
  newPoll.ttl = currTime + 1000 * 60 * 60 * 24 * 30;
  polls.push(newPoll);
  console.log(newPoll);
  res.json({ message: "Successfully started your poll", newPollId: newPoll._id });
});

module.exports = router;
