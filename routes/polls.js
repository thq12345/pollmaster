const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;

let polls = [
  {
    _id: "123",
    title: "test poll1",
    options: [
      { prompt: "option1", votes: 0 },
      { prompt: "option2", votes: 3 },
    ],
  },
  {
    _id: "sampleId2",
    title: "test poll2",
    options: [
      { prompt: "option1", votes: 3 },
      { prompt: "option2", votes: 5 },
    ],
  },
];

// search for poll with Id
router.get("/:pollId", (req, res) => {
  let poll = polls.filter((el) => {
    return el._id === req.params.pollId;
  })[0];
  res.json(poll);
});

router.get("/:pollId/vote", (req, res) => {
  let votedOptionIdx = req.query.optionIdx;
  for (let i = 0; i < polls.length; i++) {
    if (polls[i]._id === req.params.pollId) {
      polls[i].options[votedOptionIdx].votes += 1;
    }
  }
  res.send(JSON.stringify({ message: "Successfully voted" }));
});

router.post("/create-poll", (req, res) => {
  let newPoll = { title: req.body.title };
  newPoll.options = req.body.options.map((value) => {
    return { prompt: value, votes: 0 };
  });
  newPoll._id = uuid();
  polls.push(newPoll);
  res.json({ message: "Successfully started your poll", newPollId: newPoll._id });
});

module.exports = router;
