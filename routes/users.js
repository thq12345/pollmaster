const express = require("express");
const router = express.Router();

const adminUser = {
  firstName: "John",
  lastName: "Doe",
  _id: "1@1.com",
  password: "1"
};


//create new users
router.post("/registration", async (req, res) => {
  let data = {};
  let userObejct = {      
    _id: req.body.email,
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    password: req.body.password
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

module.exports = router;
