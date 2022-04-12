// importing router module to use as a router
const express = require("express");
const router = express.Router();

// importing tweet model from our database instance
const userTweets = require("../models/tweet");
// importing reply model from our database
const Reply = require("../models/reply");



// importing users
const Users = require("../models/users")
// importing fetchUser modules
const fetchUser = require("../middleware/fetchuser");

// This is my notification database
const Notify = require("../models/notifincation")
// catching things up.
router.get("/", (req, res) => {
    return res.send("Hi, this is my tweet js page")
})



// Fetching all of the tweets;;;
router.post("/gettweets", fetchUser, async (req, res) => {

    // checking if there is any user in our database;;;;;
    let user = await Users.findById(req.user.id);
    if (!user) {
        return res.status(401).send("Authentication failed. Please login again.....")
    }
    let tweets = await userTweets.find();
    try {
        let myreverse = tweets.reverse()
        console.log("The reverse is working ")
        return res.status(200).send(myreverse);
    }
    catch {
        console.log("The reverse is not working")
        return res.status(200).send(tweets);
    }
})





// Route 1: for create new tweets
router.post("/addtweet",
    fetchUser,
    async (req, res) => {
        // try to add user's tweet  body
        try {
            // desctructuring body
            const { tweet, tweetImage } = req.body;
            const newTweet = {}

            // checking availble parts of the tweet.
            if (tweet) (newTweet.tweet = tweet);
            if (tweetImage) (newTweet.tweetImage) = tweetImage;

            // storing user in our new tweet model
            newTweet.userId = req.user.id


            // creating user instance
            const savedTweet = await userTweets.create(newTweet)

            // Adding tweet id to the user's databse;
            return res.status(200).send(savedTweet);
        }

        // printing the error to the console if any
        catch (err) {
            console.log("There is some kind of error in code:: " + err);
            return res.status(500).send("Internal server error");
        }
    })


// empltying user's like list
// router.put("/updateMe/:id", async (req, res)=> {
//     // finding user 
//     let newUser = {}
//     newUser.reTweets = [];
//     const user = await Users.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true })
//     res.status(200).send(user)
// })



// Route 5: deleting tweet;
router.delete('/deletetweet/:id', fetchUser, async (req, res) => {
    try {
        // Find the tweet to be delete and delete it
        let tweet = await userTweets.findById(req.params.id);
        if (!tweet) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this tweet
        if (tweet.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // deleting all replies associalted with that tweet
        let filter = { tweetId: req.params.id }
        let reply = await Reply.find(filter)
        console.log(reply);
        // iterated each replies and deleting
        for (let i in reply) {
            if (reply[i].tweetId == req.params.id) {
                // deleting replies
                console.log("deleting the reply associated with tweet")
                await Reply.findByIdAndDelete(reply[i]._id);

            }
        }

        tweet = await userTweets.findByIdAndDelete(req.params.id)

        // adding notification to the original tweet owner
        let newNotification = {};
        newNotification.tweetId = tweet._id;
        newNotification.message = `Your tweet has been deleted`

        let notification = await Notify.create(newNotification);
        console.log(notification)

        return res.json({ "Success": "Tweet has been deleted", tweet: tweet });


    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})



// Route 6: liking a tweet
router.put("/liketweet/:id", fetchUser, async (req, res) => {
    try {
        // Find the tweet 
        let tweet = await userTweets.findById(req.params.id);
        // if not found 
        if (!tweet) {
            return res.status(404).send("Not Found")
        }

        // fetching user to append liked tweeets
        let user = await Users.findById(req.user.id)
        if (!user) {
            return res.status(501).send("Internal server error")
        }
        // if found then increment totalLikes
        let updTweet = {};
        updTweet.totalLikes = parseInt(tweet.totalLikes) + 1;
        let likedTweet = await userTweets.findByIdAndUpdate(req.params.id, { $set: updTweet }, { new: true })

        // adding to tweet id to the user's liked tweet......
        let updatedUser = {};
        updatedUser.likedTweets = user.likedTweets.set(user.likedTweets.length, req.params.id)
        // updating user's liked list
        user = await Users.findByIdAndUpdate(req.user.id, { $set: updatedUser }, { new: true })
        // printing updated user to the console
        // adding notification to the original tweet owner
        let newNotification = {};
        newNotification.tweetId = tweet._id;
        newNotification.ownersId = tweet.userId;
        newNotification.userId = req.user.id;
        newNotification.message = `liked to  your tweet`
        let notification = await Notify.create(newNotification);
        console.log(notification)
        return res.status(200).send(likedTweet);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


// Route 6: liking a tweet
router.put("/dislikeTweet/:id", fetchUser, async (req, res) => {
    try {
        // Find the tweet 
        let tweet = await userTweets.findById(req.params.id);
        // if not found 
        if (!tweet) {
            return res.status(404).send("Not Found")
        }

        // fetching user to append liked tweeets
        let user = await Users.findById(req.user.id)
        if (!user) {
            return res.status(501).send("Internal server error")
        }

        // if found then increment totalLikes
        let updTweet = {};
        updTweet.totalLikes = parseInt(tweet.totalLikes) - 1;
        let likedTweet = await userTweets.findByIdAndUpdate(req.params.id, { $set: updTweet }, { new: true })


        let newUser = {}
        newUser.likedTweets = [];
        // finding , removing and saving tweet id from user's liked list into new list
        for (let i in user.likedTweets) {
            if (user.likedTweets[i] === req.params.id) {
                console.log("id is matched and let you decied what to do");
                console.log(user.likedTweets[i]);
            }
            else {
                newUser.likedTweets.push(user.likedTweets[i]);
            }
        }


        let delikedTweet = await userTweets.findByIdAndUpdate(req.params.id, { $set: updTweet }, { new: true })
        await Users.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true })
        // printing updated user to the consol
        return res.status(200).send(delikedTweet);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})
// 

// route 8: retweeting tweets
router.put("/retweet/:id", fetchUser, async (req, res) => {
    try {
        // Find the tweet 
        let tweet = await userTweets.findById(req.params.id);
        // if not found 
        if (!tweet) {
            return res.status(404).send("Not Found")
        }

        // fetching user to append retweet to their list.
        let user = await Users.findById(req.user.id)
        if (!user) {
            return res.status(501).send("Internal server error")
        }

        // if found then increment totalLikes
        let updTweet = {};
        updTweet.totalRetweets = parseInt(tweet.totalRetweets) + 1;
        let likedTweet = await userTweets.findByIdAndUpdate(req.params.id, { $set: updTweet }, { new: true })

        // adding to tweet id to the user's retweet list......
        let updatedUser = {};
        updatedUser.reTweets = user.reTweets.set(user.reTweets.length, req.params.id)
        // updating user's liked list
        user = await Users.findByIdAndUpdate(req.user.id, { $set: updatedUser }, { new: true })
        // printing updated user to the consol 


         // adding notification to the original tweet owner
         let newNotification = {};
         newNotification.tweetId = tweet._id;
         newNotification.ownersId = tweet.userId;
         newNotification.userId = req.user.id;
         newNotification.message = `retweeted your tweets`

         let notification = await Notify.create(newNotification);
         console.log(notification)

        return res.status(200).send(likedTweet);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


// route 8: detweeting tweets
router.put("/detweet/:id", fetchUser, async (req, res) => {
    try {
        // Find the tweet 
        let tweet = await userTweets.findById(req.params.id);
        // if not found 
        if (!tweet) {
            return res.status(404).send("Not Found")
        }


        // fetching user to append retweet to their list.
        let user = await Users.findById(req.user.id)
        if (!user) {
            return res.status(501).send("Internal server error")
        }
        let newUser = {}
        newUser.reTweets = [];
        // finding , removing and saving tweet id from user's retweet list into new list
        for (let i in user.reTweets) {
            if (user.reTweets[i] === req.params.id) {
                console.log("id is matched and let you decied what to do");
                console.log(user.reTweets[i]);
            }
            else {
                newUser.reTweets.push(user.reTweets[i]);
            }
        }


        // if found then decrement the tweet
        let updTweet = {};
        updTweet.totalRetweets = parseInt(tweet.totalRetweets) - 1;
        let detweet = await userTweets.findByIdAndUpdate(req.params.id, { $set: updTweet }, { new: true })
        await Users.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true })
        return res.status(200).send(detweet);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


// Route 9: fetch tweets by id:
router.get('/getUserTweets/:id', fetchUser, async (req, res) => {
    try {
        let user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(401).send("Authentication failed. Please login again.....")
        }

        let filter;

        try {
            await Users.findById(req.params.id);
            filter = { userId: req.params.id };
        }
        catch {
            filter = { userId: req.user.id };
        }

        let tweets = await userTweets.find(filter);
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
        res.status(501).send("Internal server error");
    }
})


// Route 9: fetch tweets by id:
router.get('/getLikedTweets/:id', fetchUser, async (req, res) => {
    try {
        let user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(401).send("Authentication failed. Please login again.....")
        }
        let likedTweets = [];
        for (let i in user.likedTweets){
            // fetching tweet with that id;
            let tweet = await userTweets.findById(user.likedTweets[i]);
            if(tweet){
                likedTweets.push(tweet);
            }
        }
       
        try {
            let myreverse = likedTweets.reverse()
            return res.status(200).send(myreverse);
        }
        catch { 
            return res.status(200).send(likedTweets);
        }
    }
    catch (error) {
        console.log("Error Message: ", error);
        return res.status(501).send("Internal server error");
    }
})
// Route 9: fetch ReTweets by id:
router.get("/getUserReTweets/:id", fetchUser, async (req, res) => {
    try {
        let user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(401).send("No user found with this id.")
        }

        let reTweets = [];
        for (let i in user.reTweets){
            // fetching tweet with that id;
            let tweet = await userTweets.findById(user.reTweets[i]);
            if(tweet){
                reTweets.push(tweet);
            }
        }
        try {
            let myreverse = reTweets.reverse()
            return res.status(200).send(myreverse);
        }
        catch {
            return res.status(200).send(reTweets);
        }
    }
    catch (error) {
        console.log("Error Message: ", error);
        return res.status(501).send("Internal server error");
    }
})

module.exports = router;