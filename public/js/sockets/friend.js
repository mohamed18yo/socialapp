const addBtn= document.getElementById('addBtn')

// const myId= document.getElementById('myId').value
const myName= document.getElementById('myName').value
const myPicture= document.getElementById('myPicture').value
const friendId= document.getElementById('friendId').value
const friendImage= document.getElementById('friendImage').value
const friendName= document.getElementById('friendName').value

addBtn.onclick = (e)=>{
    e.preventDefault();
    // first step.
    socket.emit('sendFriendRequest',{
        myId,
        myName,
        myPicture,
        friendId,
        friendImage,
        friendName
    })
}
socket.on('requestSent',()=>{
    addBtn.remove()
    document.getElementById('friend-form').innerHTML+= `<input type="submit"  formaction="/friend/cancel" value="Cancel Request" class="btn btn-danger">` 
})  