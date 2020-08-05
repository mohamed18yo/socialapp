 
 var socket = io();

const btn = document.getElementById("dropdownMenuButton");
let myId = document.getElementById("userId").value;


socket.on("connect", () => {
  // console.log('connected');

  // console.log(id);
  socket.emit("joinNotificationRoom", myId);

  socket.emit("goOnline", myId);
});

socket.on('receivedMessage', (msg)=>{
  // console.log("fucking received" , msg.received);
  var countMsg= $("#countMsg")
  countMsg.text("1+");
  countMsg.css('background-color','red')
  $('#msglist').append(`<a class="dropdown-item" href="/chat/${msg.chat}"><span>${msg.content}</span></a>`);
})

socket.on("newFriendRequest", (data) => {
  console.log(data);

  const friendRequest = document.getElementById("friendRequest");
  const span = friendRequest.querySelector("span");
  if (span) span.remove();
  friendRequest.innerHTML += ` <div  style="
                                              width: 300px;
                                              height: 70px;
                                              background: #e8e8e8;
                                              margin-left:7px;
                                              margin-bottom:5px;
                                            " >
<img src="${data.picture}" alt="Paris" width="60" height="60" style="
                                                                      margin-top: 5px;
                                                                      margin-left: 5px;
                                                                    ">
<span >${data.name}</span>
    <a href="/profile/${data.id}"> <button class="btn btn-primary" style="float:right;margin-top: 20px;margin-right: 7px;">Profile</button></a>
</div>
  `;
  // btn.classList.remove("btn-secondary");
  // btn.classList.add("btn-danger");
 var count= $('#count')
 count.css('background-color','red')
 count.text("1+")
});

btn.onclick = () => {
//   var count= $('.count') 
//  count.classList.remove("count");
  // btn.classList.add("btn-secondary");
};
