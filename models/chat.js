var mongoose = require("../helper/db");

const chatSchema = mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Chat = mongoose.model("chat", chatSchema);

async function getChat(chatId){
  try {
    
    let chat= await Chat.findById( chatId ).populate('users');

    return chat;
  } catch (error) {
    throw new Error(error)
  }
 
}
 

module.exports ={
  Chat ,
  getChat 
};
