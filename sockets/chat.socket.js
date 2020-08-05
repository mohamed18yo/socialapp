

var newMessage= require('../models/message').newMessage
module.exports = (io) => {

  io.on("connection", (socket) => {

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log('join fuking user');
    });
    socket.on("sendMessage", (msg) => {
      newMessage(msg).then(()=>{
         io.to(msg.chat).emit("newMessage", msg);
         io.to(msg.received).emit("receivedMessage", msg);
      })
      //  console.log(msg);
     
    });
  });
};
