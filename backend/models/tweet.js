// importing mongoose to create a model in our database mongodb
const mongoose = require("mongoose");

// importing schema for our mongoose
const {Schema} = mongoose;

// creating database instance.

const UserTweetShema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        req: true
    },
    tweet: {
        type: String,
    },
    tweetImage: {
        type:String
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    totalRetweets: {
        type: Number,
        default: 0
    },
    totalReplies: {
        type:Number,
        default: 0
    }
})
// creating model
const UserTweet = mongoose.model("UserTweet", UserTweetShema);

// exporting our model:
module.exports = UserTweet;
