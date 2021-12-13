const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../../models/user');

router.post('/register', (req, res) => {
  try {
    let user = {
      email: req.body.email,
      password: passwordHash(req.body.password)
    }
    let checkUser = Users.find({
      email: user.email
    });
    checkUser
    .then((data) => {
      if (data.length) {
        res.send("User already registered.");
      } else {
        let registerUser = new Users(user);
        registerUser.save()
        .then(() => {
          res.send("User registered.")
        })
      }
    })
  }
  catch (err) {
    res.send(500,
      {
        msg: "error"
      })
  }
})

router.post('/login', (req, res) => {
  let checkUser = Users.find({
    email: req.body.email
  });
  checkUser
  .then((data) => {
    if (data.length) {
      let comparePassword = bcrypt.compareSync(req.body.password, data[0].password)
      if (comparePassword) {
        res.send("Logged in.")
      } else {
        res.send("Invalid password.")
      }
    } else {
      res.send(500, "User doesn't exist.")
    }
  })
})

const passwordHash = (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = router;