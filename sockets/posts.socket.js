module.exports = (io) => {

var addPost= require('../models/user').addPost
    io.on("connection", (socket) => {
    socket.on("postserver" , function(data) {
        addPost(data).then(()=>{
            io.emit('postclient',data )
        })
       
    })
})
}