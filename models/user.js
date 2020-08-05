var mongoose = require("../helper/db");

var Chat = require("./chat").Chat;

var PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  fbId: String,
  gId: String,
  picture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTv_8jyrBjic0ELBWNbA2JH7ufzOb3jkJvN8Q&usqp=CAU",
  },
  friends: [{ name: String, picture: String, id: String, chatId: String }],
  default: [],
  friendsRequest: [{ name: String, picture: String, id: String }],
  default: [],
  friendsReceved: [{ name: String, id: String }],
  default: [],
  posts: [{ body: String }],
  default: [],
});

userSchema.plugin(PassportLocalMongoose);

const User = mongoose.model("User", userSchema);

function getUserData(id) {
  // console.log(id);
  return new Promise((resolve, reject) => {
    return User.findById(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function sendRequest(data) {
  // console.log(data.myId);
  try {
    await User.updateOne(
      { _id: data.friendId },
      {
        $push: {
          friendsRequest: {
            name: data.myName,
            picture: data.myPicture,
            id: data.myId,
          },
        },
      }
    );
    await User.updateOne(
      { _id: data.myId },
      {
        $push: {
          friendsReceved: { name: data.friendName, id: data.friendId },
        },
      }
    );
    return;
  } catch (error) {
    throw new Error(error);
  }
}
async function cancelRequest(data) {
  try {
    await User.updateOne(
      { _id: data.friendId },
      {
        $pull: {
          friendsRequest: { id: data.myId },
        },
      }
    );
    await User.updateOne(
      { _id: data.myId },
      {
        $pull: {
          friendsReceved: { id: data.friendId },
        },
      }
    );
    return;
  } catch (error) {
    throw new Error(error);
  }
}

async function acceptRequest(data) {
  try {
    let newCaht = new Chat({
      users: [data.myId, data.friendId],
    });
    let chatDoc = await newCaht.save();

    await User.updateOne(
      { _id: data.friendId },
      {
        $push: {
          friends: {
            name: data.myName,
            id: data.myId,
            picture: data.myPicture,
            chatId: chatDoc._id,
          },
        },
      }
    );
    await User.updateOne(
      { _id: data.myId },
      {
        $push: {
          friends: {
            name: data.friendName,
            id: data.friendId,
            picture: data.friendImage,
            chatId: chatDoc._id,
          },
        },
      }
    );
    await User.updateOne(
      { _id: data.myId },
      {
        $pull: {
          friendsRequest: { name: data.friendName, id: data.friendId },
        },
      }
    );
    await User.updateOne(
      { _id: data.friendId },
      {
        $pull: {
          friendsReceved: { name: data.myName, id: data.myId },
        },
      }
    );

    return;
  } catch (error) {
    throw new Error(error);
  }
}

async function rejectRequest(data) {
  await User.updateOne(
    { _id: data.myId },
    {
      $pull: {
        friendsRequest: { name: data.friendName, id: data.friendId },
      },
    }
  );
  await User.updateOne(
    { _id: data.friendId },
    {
      $pull: {
        friendsReceved: { name: data.myName, id: data.myId },
      },
    }
  );
}

async function deleteFriend(data) {
  await User.updateOne(
    { _id: data.myId },
    {
      $pull: {
        friends: { name: data.friendName, id: data.friendId },
      },
    }
  );
  await User.updateOne(
    { _id: data.friendId },
    {
      $pull: {
        friends: { name: data.myName, id: data.myId },
      },
    }
  );
}

async function getFriendReq(id) {
  try {
    let data = await User.findById(id);
    //console.log('fuck request:', requests)
    return data.friendsRequest;
  } catch (error) {
    throw new Error(error);
  }
}

async function getFriends(id) {
  try {
    let data = await User.findById(id);
    return data.friends;
  } catch (error) {
    throw new Error(error);
  }
}

async function addPost(data) {
  // console.log(data.myId);
  try {
    await User.updateOne(
      { _id: data.myId },
      {
        $push: {
          posts: { body: data.body },
        },
      }
    );
    return;
  } catch (error) {
    throw new Error(error);
  }
}
async function getUsers() {
  try {
    let users = await User.find();
    return users;
  } catch (error) {}
}

async function getCountFR(id) {
  let count = await User.findById(id);
  return count.friendsRequest.length;
}
module.exports = {
  User,
  getUserData,
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
  deleteFriend,
  getFriendReq,
  getFriends,
  addPost,
  getUsers,
  getCountFR,
};
