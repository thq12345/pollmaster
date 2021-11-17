const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;

let polls = [
  {
    _id: "sampleId1",
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
  res.send(
    polls.filter((el) => {
      return el._id === req.params.pollId;
    })
  );
});

router.post("/create-poll", (req, res) => {
  let newPoll = { title: req.body.title };
  newPoll.options = req.body.options.map((value) => {
    return { prompt: value, votes: 0 };
  });
  newPoll._id = uuid();
  polls.push(newPoll);
  res.json({ newPoll });
});

module.exports = router;
