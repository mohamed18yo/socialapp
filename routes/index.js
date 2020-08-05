var express = require("express");
var router = express.Router();
var passport = require("passport");
var bodyParser = require("body-parser");

var User = require("../models/user");
var user = require("../middlewares/user");

router.get("/", function (req, res, next) {
  res.render("login", { title: "login" });
});
/* Post login page. */
// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/" }),
//   function (req, res) {
//     res.redirect("/home");
//   }
// );
//login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

/* GET home page. */
router.get("/home", user, async function (req, res, next) {
  User.getFriendReq(res.locals.user._id).then((result) => {
    User.getCountFR(res.locals.user._id).then((count)=>{
      console.log("name", result);
    res.render("home", {
      title: "Home",
      user: res.locals.user,
      myId: res.locals.user._id,
      friendReq: result,
      count: count,   
    })
    
    });
  });
});
router.get("/friends", user, function (req, res) {
  let myId = res.locals.user._id;
  User.getFriendReq(res.locals.user._id).then((result) => {
    User.getFriends(res.locals.user._id).then((friends) => {
      User.getUsers().then((users) => {
        User.getCountFR(res.locals.user._id).then((count)=>{
          res.render("friends", {
          friendReq: result,
          friends: friends,
          users: users,
          notOwner: users.id != myId,
          count: count,   
        })
        
          // notFriend: users.friends.find().then((user) =>{
          //    user.id != String(myId)
          //   })
        });
      });
    });
  });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "register" });
});

router.post("/register", function (req, res, next) {
  User.User.create(req.body).then(function (result) {
    res.redirect("/");
  });
});

// res.render('register', { title: 'register' });

//login with facebook acount.
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

//login with google acount.
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
  function (req, res) {
    // The request will be redirected to Google for authentication, so
    // this function will not be called.
  }
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
