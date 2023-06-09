const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const app = express();

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../../authen/authenticate");

router.post("/signup", (req, res, next) => {
  // Verify that first name is not empty
  const name = req.body.name;
  var nameMatch = req.body.email.match(/^([^@]*)@/);
  var username = nameMatch ? nameMatch[1] : null;
  User.register(
    new User({
      username: username,
      email: req.body.email,
      name: name,
      phone: req.body.phoneNumber,
    }),
    req.body.password,
    (err, user) => {
      console.log(err);
      // console.log(user);
      if (err) {
        res.status(500).json({ status: "not registered", err: err });
      } else {
        //    user.firstName = firstName;
        //  user.lastName = req.body.lastName;
        console.log("user registered");
        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user.save().then((user, err) => {
          if (err) {
            res
              .status(500)
              .json({ status: "not saved successfully", err: err });
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.status(200).json({ success: true, token: token });
            app.post("/filterform", (req, res) => {
              console.log("fill form");
            });
          }
        });
      }
    }
  );
});
router.post("/fiterform", (req, res) => {
  console.log(req.body);
  const token = getToken({ _id: req.user._id });

  User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        gender: req.body.gender,
        martialStatus: req.body.martialStatus,
        state: req.body.state,
      },
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  // console.log(req.body);
  const token = getToken({ _id: req.user._id });

  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id)
    .then((user) => {
      user.refreshToken.push({ refreshToken });
      user
        .save()
        .then((user) => {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.status(200).json({ success: true, token });
          //res.s
        })
        .catch((err) => {
          res.status(500).json({ message: "token not refreshed ", err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "cannot find user name sign up", err: err });
    });
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id)
    .then((user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user
        .save()
        .then((user) => {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          res.status(500).json({ success: false, err: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err: err });
    });
});

router.get("/user", verifyUser, (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

module.exports = router;
