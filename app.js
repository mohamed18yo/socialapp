var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var User = require("./models/user");

var bodyParser= require('body-parser')
var passport = require("passport")
var localStrategy = require('passport-local-mongoose');

var passportLocal = require("passport-local");


var passportFacebook = require("passport-facebook");
var passportGoogle = require("passport-google-oauth20").Strategy;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/profile");
var friendRouter = require("./routes/friend");
var chatRouter = require("./routes/chat");

var UserModel = require("./models/user");
var socketIo = require('socket.io');

var app = express();



// get friend request
app.use((req, res, next) => {
  if (res.locals.user) {
    UserModel.getFriendReq(res.locals.user._id).then((result) => {
      req.locals.friendRequests = result
      next()
    }).catch((err)=>{
      res.redirect('/error')
    })
  }else{
    next()
  }
});

//   authintication passport .

// login with google account.
passport.use(
  new passportGoogle(
    {
      clientID:
        "552530349583-q07h7vcbssefsoop6hlr03mu6986o1mp.apps.googleusercontent.com",
      clientSecret: "g5C1eXQEdUCIoe5I8VNeyg8x",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("profile", profile);
      // return cb(null, profile);
      User.User.findOne({ gId: profile._json.sub }, function (err, res) {
        if (res) {
          cb(null, res);
        } else {
          User.User.create({
            gId: profile._json.sub,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            picture: profile._json.picture,
          })
            .then(function (result) {
              cb(null, result);
            })
            .catch(function (err) {
              cb(err, false);
            });
        }
      });
    }
  )
);
// passport local

passport.use(
  new passportLocal(function (username, password, cb) {
    User.User.findOne({ email: username }, function (err, res) {
      if (res) {
        if (res.password == password) {
          cb(null, res);
        } else {
          cb(null, false);
        }
      } else {
        cb(null, false);
      }
    });
  })
);


// login with Facebook account.
passport.use(
  new passportFacebook(
    {
      clientID: "267314911013208",
      clientSecret: "1e4186110f98ded72428c4abf36bf6c1",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("profile", profile);
      // return cb(null, profile);
      User.User.findOne({ fbId: profile._json.id }, function (err, res) {
        if (res) {
          cb(null, res);
        } else {
          let fullName = profile._json.name.split(" ");

          User.User.create({
            fbId: profile._json.id,
            firstName: fullName[0],
            lastName: fullName[1],
            email: profile._json.email,
            picture: profile._json.picture.url,
          })
            .then(function (user) {
              console.log("user", user);

              return cb(null, user);
            })
            .catch(function (err) {
              console.log("err", err);

              return cb(err, false);
            });
        }
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (id, cb) {
  cb(null, { username: "Oday" });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "vash");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.session.passport ? req.session.passport.user : null;
  // console.log("res.session", res.session);
  // console.log("res.locals.user", res.locals.user);
  next();
});

app.use("/profile", profileRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/friend", friendRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
