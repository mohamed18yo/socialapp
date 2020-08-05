var chatId = $("#chatId").val();

socket.emit("joinChat", chatId);

$("#sendBtn").click(function () {
  var msg = $("#msg").val();
  var received = $("#receivedId").val();
  //console.log(msg);

  socket.emit("sendMessage", {
    chat: chatId,
    content: msg,
    sender: myId,
    received: received
  });
});

socket.on("newMessage", (msg) => {
  $(".chat-messages").append(`<li style="float:right; list-style: none;background: #4343ca;color: white;border-style: solid;padding-left: 5px;padding-right: 5px;">${msg.content}</li></br>`);
 
    $('#msg').val("");
  
});

//  