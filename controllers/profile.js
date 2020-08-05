var Usermodle = require("../models/user");

exports.getProfile = (req, res, next) => {
  let id = req.params.id;
  idSession = String(res.locals.user._id);
  if (!id) return res.redirect("/profile/" + idSession);
 
  Usermodle.getUserData(id).then((data) => {
    Usermodle.getFriendReq(res.locals.user._id).then((result) => {
      console.log('friends Request:', result);
      res.render("profile", {
        
        User: data,
        myId: idSession,
        userId: idSession,
        myData: res.locals.user,
        isOwner: id == idSession,
        friendReq: result,
        
        isFriends: data.friends.find((friend) => friend.id === idSession),
        isRquestSent: data.friendsRequest.find(
          (friend) => friend.id === idSession
        ),
        isRquestReceve: data.friendsReceved.find(
          (friend) => friend.id === idSession
        ),
      });
    });
  });
};
