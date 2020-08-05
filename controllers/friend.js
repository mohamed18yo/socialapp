var Usermodle = require("../models/user");

exports.add = (req, res, next) => {
  // res.send(req.body)
  Usermodle.sendRequest(req.body)
    .then(() => {
      res.redirect("/profile/" + req.body.friendId);
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
exports.cancel = (req, res, next) => {
  Usermodle.cancelRequest(req.body)
    .then(() => {
      res.redirect("/profile/" + req.body.friendId);
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
exports.accept = (req, res, next) => {
  Usermodle.acceptRequest(req.body)
    .then(() => {
      res.redirect("/profile/" + req.body.friendId);
    })
    .catch((err) => {
      res.redirect("/error");
    });

};
exports.reject = (req, res, next) => {
  Usermodle.rejectRequest(req.body)
    .then(() => {
      res.redirect("/profile/" + req.body.friendId);
    })
    .catch((err) => {
      res.redirect("/error");
    });
};

exports.delete = (req, res, next) => {
  Usermodle.deleteFriend(req.body)
    .then(() => {
      res.redirect("/profile/" + req.body.friendId);
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
