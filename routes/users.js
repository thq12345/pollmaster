const express = require("express");
const databaseManager = require("../db/dbManager");
const router = express.Router();
const { ObjectId } = require("mongodb");

//create new users
router.post("/registration", async (req, res) => {
  let data = {};
  
  let userObejct = {
    _id: req.body.email.toLowerCase(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    createdPolls: [],
    votedPolls: {},
  };
  let statusCode = 200;
  try {
    await databaseManager.create("users", userObejct);
    data.user = userObejct;
  } catch (err) {
    if (err.code === 11000) {
      statusCode = 400;
      data.message = "Email is already in use";
    } else {
      statusCode = 500;
      data.message = err.message;
    }
  }

  res.status(statusCode).send(JSON.stringify(data));
});

// GET users login
router.post("/login", async (req, res) => {
  let data = {};
  let statusCode = 200;
  try {
    let users = await databaseManager.read("users", {
      _id: req.body.email.toLowerCase(),
    });
    let user = users[0];
    // let user = adminUser;
    if (user && user.password === req.body.password) {
      data.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        createdPolls: user.createdPolls,
        votedPolls: user.votedPolls,
      };
    } else {
      statusCode = 401;
      data.message = "Incorrect email/password";
    }
  } catch (err) {
    statusCode = 500;
    data.message = err.message;
  }

  res.status(statusCode).send(JSON.stringify(data));
});

//serpate get poll VS one get poll
//change ownpoll and voted polls as * ??

//get polls created by user
router.get("/:userID", async (req, res) => {
  let users = await databaseManager.read("users", {
    _id: req.params.userID,
  });
  let user = users[0];

  let relatedPolls = { ownPolls: [], votedPolls: [] };

  if (user.createdPolls) {
    relatedPolls.ownPolls = await databaseManager.read("polls", {
      _id: { $in: user.createdPolls },
    });
  }

  let votedPollArray = [];
  if (user.votedPolls) {
    for (let key in user.votedPolls) {
      votedPollArray.push(ObjectId(key));
    }
    relatedPolls.votedPolls = await databaseManager.read("polls", {
      _id: { $in: votedPollArray },
    });
  }

  res.send(JSON.stringify(relatedPolls));
});

module.exports = router;
