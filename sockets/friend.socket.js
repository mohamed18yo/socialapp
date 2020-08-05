var { sendRequest, getFriends } = require("../models/user");

module.exports = (io) => {
  io.on("connection", (socket) => {
    // first step.
    socket.on("sendFriendRequest", (data) => {
      console.log("data", data);
      
      sendRequest(data)
        .then(() => {

          socket.emit("requestSent");

          io.to(data.friendId).emit("newFriendRequest", {
            name: data.myName,
            id: data.myId,
            picture: data.myPicture,

          });
        })
        .catch((err) => {
          socket.emit("requestFailed");
        });
    });

    socket.on('getOnlineFrineds', (id)=>{
      getFriends(id).then((friends)=>{
        let onlineFriends= friends.filter((friend)=> io.onlineUsers[friend.id])
          console.log(onlineFriends);
          
          socket.emit('onlineFriends', onlineFriends)
        
      })
    })
  });
};
