var Chat = require("../models/chat");

var Message = require("../models/message");

var User = require("../models/user");
const message = require("../models/message");

exports.getCaht = (req, res, next) => {
  let chatId = req.params.id;

  Message.getMessage(chatId).then((messages) => {
    if (messages.length === 0) {
      Chat.getChat(chatId).then((chat) => {
        let friendData = chat.users.find(
          (user) => user._id != res.locals.user._id
        );
        User.getFriendReq(res.locals.user._id).then((friendReq) => {
          res.render("chat", {
            friendReq: friendReq,
            messages: messages,
            friendData: friendData,
            chatId: chatId,
            myId: res.locals.user._id
          });
        });
      });
    } else {
      let friendData = messages[0].chat.users.find(
        (user) => user._id != res.locals.user._id
      );
      User.getFriendReq(res.locals.user._id).then((friendReq) => {
        res.render("chat", {
          friendReq: friendReq,
          messages: messages,
          friendData: friendData,
          chatId: chatId,
          myId: res.locals.user._id,
        });
      });
    }

    //  res.send(messages)
  });
};
