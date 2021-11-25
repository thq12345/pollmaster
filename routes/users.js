const express = require("express");
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
    //votedPolls: {},
    votedPolls: [],
  };
  let statusCode = 200;
  try {
    data.user = userObejct;
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
    //    let users;
    let user = adminUser;
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

//
// router.get("/:userID", async (req,res)=> {

// });

module.exports = router;
