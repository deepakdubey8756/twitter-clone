// importing mongoose
const mongoose = require("mongoose")

// icreating schema

const replySchema = new mongoose.Schema({
    tweetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserTweet"
    },
    replyBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    replyContent: {
        type:String,
        req: true
    },
    replyImage: {
        type:String,
        default:""
    },
    retweet: {
        type: Number,
        default: 0
    },
});

// creating model reply
const Reply = mongoose.model("reply", replySchema);

// exporting our schema
module.exports = Reply;