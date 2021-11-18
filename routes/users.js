const express = require("express");
const router = express.Router();

const adminUser = {
  firstName: "John",
  lastNmae: "Doe",
  _id: "1@1.com",
  password: "1"
};


//create new users
router.post("/", async (req, res) => {

});

// GET users login
router.get("/login", async (req, res) => {
  let data = {};
  let statusCode = 200;

  try {
    let users;

    let user = adminUser;
    if (user && user.password === req.body.password) {
      data.user = {
        firstName: user.firstName,
        lastNmae: user.lastNmae,
        email: user._id,
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
