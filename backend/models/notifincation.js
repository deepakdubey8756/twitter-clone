// importing mongoose
const mongoose = require("mongoose")

// icreating schema

const notifySchema = new mongoose.Schema({
    tweetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserTweet"
    },
    ownersId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type:String,
        req: true
    },
    content: {
        type: String, 
        default: ""
    }
});

// creating model reply
const Notify = mongoose.model("notification", notifySchema);

// exporting our schema
module.exports = Notify;