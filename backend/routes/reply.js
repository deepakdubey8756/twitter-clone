// importing router module to use as a router
const express = require("express");
const router = express.Router();

// importing tweet model from our database instance
const userTweets = require("../models/tweet");
// importing reply model from our database
const Reply = require("../models/reply");
const Notify = require("../models/notifincation");


// importing fetchUser modules
const fetchUser = require("../middleware/fetchuser");
const Users = require("../models/users");

// catching things up.
router.get("/", (req, res) => {
    return  res.status(200).send("Hi, this is my reply js page")
})



// Fetching all of the tweets;;;
router.get("/getreply/:id", fetchUser, async (req, res) => {
    try{

    // checking if there is any user in our database;;;;;
    let user = await Users.findById(req.user.id);
    if (!user) {
        return  res.status(401).send("Authentication failed. Please login again.....")
    }
    let tweets;
    console.log("The fucking error is here")
    console.log(req.params.id)
    console.log("The fucking error is here 1")
    if(req.params.id){
        let filter = { tweetId: req.params.id };
        console.log("The fucking error is here 2")
        tweets = await Reply.find(filter);
        console.log("The fucking error is here 3")
    }
    else{
        tweets = [];
    }
    try {
        let myreverse = tweets.reverse()
        console.log("The reverse is working ")
        console.log("The fucking error is here 4")
        return res.status(200).send(myreverse);
    }
    catch {
        console.log("The fucking error is here 5")
        console.log("The reverse is not working")
        return res.status(200).send(tweets);
    }
    }
    catch(error){
        console.log("There is some error here: ", error);
        return res.status(501).send("Internal server error");
    }
})




// Route 2: creating reply
router.post("/addreply/:id",
    fetchUser,
    async (req, res) => {
        try {
            console.log("I am at here")
            // destructuring body 
            const { replyContent, replyImage } = req.body;
            try {
                // finding is there any tweet with id or not    
                let tweet = await userTweets.findById(req.params.id);
                if (!tweet) { return res.status(404).send("No Tweet found with this id Found") }

                // finding replied user's details  
                let user = await Users.findById(req.user.id);
                if (!user) { return res.status(404).send("Authentication failed please login again") }


                newReply = {};
                if (replyContent) { newReply.replyContent = replyContent };
                if (replyImage) { newReply.replyImage = replyImage };
                // saving user id and tweet id
                newReply.tweetId = tweet._id;
                // saving user;
                newReply.replyBy = req.user.id;
                // creating user instance
                const savedReply = await Reply.create(newReply);

                // Incrementing total reply on tweet
                newTweet = {}
                newTweet.totalReplies = tweet.totalReplies + 1;

                // saving updated post;
                await userTweets.findByIdAndUpdate(req.params.id, { $set: newTweet }, { new: true });

                // adding notification to the original tweet owner
                let newNotification = {};
                newNotification.tweetId = tweet._id;
                newNotification.ownersId = tweet.userId;
                newNotification.userId = req.user.id;
                newNotification.content = replyContent;
                newNotification.message = `replied to  your tweets`

                let notification = await Notify.create(newNotification);
                console.log(notification)
                // sending response
                return res.json(savedReply);
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal Server Error");
            }
        }

        // printing the error to the console if any
        catch (err) {
            console.log("There is some kind of error in code:: " + err);
            return res.status(500).send("Internal server error");
        }
    })








// Route 5: deleting reply;

router.delete('/deletereply/:id', fetchUser, async (req, res) => {
    try {
        // Find the tweet to be deleted and delete it
        let reply = await Reply.findById(req.params.id);
        if (!reply) { return res.status(404).send("The fucking reply is not found my fucking boy") }

        // Allow deletion only if user owns this tweet
        if (reply.replyBy.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        reply = await Reply.findByIdAndDelete(req.params.id)

        // fetching the tweet's 
        let tweet = await userTweets.findById(reply.tweetId)
        newTweet = {};
        newTweet.totalReplies = tweet.totalReplies - 1;
        await userTweets.findByIdAndUpdate(reply.tweetId, { $set: newTweet }, { new: true });
        return res.json({ "Success": "Reply has been deleted", reply: reply });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})



// Fetching the liked tweets of the fucking user
router.get('/getUserReplies/:id', fetchUser, async (req, res) => {
    try {
        let user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(401).send("Authentication failed. Please login again.....")
        }
        
        let filter;

        try {
            await Users.findById(req.params.id);
            filter = { replyBy: req.params.id };
        }
        catch {
            filter = { replyBy: req.user.id };
        }

        let tweets = await Reply.find(filter);
        try {
            let myreverse = tweets.reverse()
            return res.status(200).send(myreverse);
        }
        catch {
            return res.status(200).send(tweets);
        }
    }
    catch (error) {
        console.log("Error Message: ", error);
        return res.status(501).send("Internal server error");
    }
})



module.exports = router;