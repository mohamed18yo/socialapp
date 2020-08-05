var mongoose = require("../helper/db");

const messageSchema = mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
  content: String,
  sender: String,
  timestemp: Number,
});
const Message = mongoose.model("message", messageSchema);

async function getMessage(chatId) {
  try {
    let messages = await Message.find({ chat: chatId }, null, {
      sort: {
        timestemp: 1,
      },
    }).populate({
      path: "chat",
      model: "chat",
      populate: {
        path: "users",
        model: "User",
        select: "firstName lastName picture ",
      },
    });
    return messages;
  } catch (error) {
    throw new Error(error);
  }
}

async function newMessage(msg) {
  try {
    msg.timestemp = Date.now();
    
    let newMsg = await new Message(msg);
    await newMsg.save();
    return;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  getMessage,
  Message,
  newMessage,
};
