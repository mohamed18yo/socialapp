var mongoose = require("../helper/db");


const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    body : String ,
   

});

const Post= mongoose.model('Post', postSchema);


module.exports = Post ; 