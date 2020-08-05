socket.emit('getOnlineFrineds', myId)

socket.on('onlineFriends', (friend)=>{
    console.log(friend);
    if(friend.length===0){
        $("#onlineFriends").append(`<div  class="thumbnail">
        <p>NO Friend Online</p>
        
    </div>`)
    }else{
        friend.forEach((friends)=>{
            $("#onlineFriends").append(` <div  class="thumbnail">
            <a href="/profile/${friends.id}"><img src="${friends.picture}" alt="Paris" width="60" height="60">
        <p>${friends.name}</p></a>
        <hr>
        <a href="/chat/${friends.chatId}"<button class="btn btn-primary">Chat</button>
    </div>`
    );
        })
        
    }
   
})