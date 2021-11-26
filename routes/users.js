const express = require("express");
const databaseManager = require("../db/dbManager");
const router = express.Router();

const adminUser = {
  firstName: "John",
  lastName: "Doe",
  _id: "1@1.com",
  password: "1",
  createdPolls: ["c38ad53b-3fec-49a2-812e-00cf1b328077", "1ab97963-b1e4-48ed-98fb-25201a10abea"],
  votedPolls: { "701b6e27-f612-4e86-ba79-aaafa451c3b2": 1, "4d470e08-7906-413d-af41-53e17842054c": 0 },
};

//create new users
router.post("/registration", async (req, res) => {
  let data = {};
  let userObejct = {
    _id: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    createdPolls: [],
    votedPolls: {},
  };
  let statusCode = 200;
  try {
    await databaseManager.create("users",  userObejct);
    data.user = userObejct;
    // data.user = adminUser;
    console.log("user created");
  } catch (err) {
    statusCode = 500;
    data.message = err.message;
  }

  res.status(statusCode).send(JSON.stringify(data));
});

// GET users login
router.post("/login", async (req, res) => {
  let data = {};
  let statusCode = 200;
  try {
    let users = await databaseManager.read("users", {
      _id: req.body.email,
    });    
    let user = users[0];
    // let user = adminUser;
    if (user && user.password === req.body.password) {
      data.user = {
        firstName: user.firstName,
        lastName: user.lastNamae,
        _id: user._id,
        createdPolls: user.createdPolls,
        votedPolls: user.votedPolls,
      };
    } else {
      statusCode = 500;
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
router.get("/:userID", async (req,res)=> {
  let users = await databaseManager.read("users", {
    _id:req.params.userID
  });
  let user = users[0];

  let relatedPolls = {ownPolls:[], votedPolls:[]};

  if(user.createdPolls){
    relatedPolls.ownPolls = await databaseManager.read("polls", {
      _id:{$in:user.createdPolls}
    });}

  let votedPollArray = [];
  if(user.votedPollPolls){
    for (let key in user.votedPolls) {
      votedPollArray.push(key);
    }
    relatedPolls.votedPolls = await databaseManager.read("polls",{
      _id:{$in:votedPollArray}
    });
  }
  
  res.send(JSON.stringify(relatedPolls));

  //conver key to array, 
});

// //get polls participated by uuserID/votedPoll/:userID", async (req,res)=> {
//   let posts = await databaseManager.read("polls", {
//     //creator: req.body.user)ID
//   });
// });

//Update votedPolls

//update createdPolls

module.exports = router;
