// importing router module to use as a router
const express = require("express");
const router = express.Router();




const  Notify = require("../models/notifincation");


// importing fetchUser modules
const fetchUser = require("../middleware/fetchuser");
const Users = require("../models/users");



// Fetching all of the tweets;;;
router.get("/getnotify", fetchUser, async (req, res) => {

    try{
        // checking if there is any user in our database;;;;;
    let user = await Users.findById(req.user.id);
    if (!user) {
        return res.status(401).send("Authentication failed. Please login again.....")
    }
    // filtering all notificatinos related to owners
    filter = {ownersId: req.user.id};
    const myNotifications = await Notify.find(filter);
    try {
        let myreverse = myNotifications.slice(-10).reverse()
        return res.status(200).send(myreverse);

    }
    catch {
        return res.status(200).send(myNotifications);
    }
    }
    catch(error){
        return res.status(501).send("Internal server error")
    }
})



module.exports = router;