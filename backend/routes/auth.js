// importing router module to use as a router
const express = require("express");
const router = express.Router();

//importing express validator to validate my request.
const { body, validationResult } = require("express-validator");
// importing user model from our database instance
const User = require("../models/users");


// importing bcrypt to hash my  passowrds
const bcrypt = require('bcryptjs');
//importing jwt i.e json web tokens
const jwt = require("jsonwebtoken");
// importing my jwt secret
const JWT_SECRET = require("../credentials");
// importing fetchUser modules
const fetchUser = require("../middleware/fetchuser");

// importing modules to work with images

// Route 1: for create new users
router.post("/createuser",
    // password must be at least 5 chars long
    body('name', "name must be more than 3 words").isLength({ min: 4 }),
    // email must be an email
    body('address', "your address is not valid").isLength({ min: 25 }),
    // password must be at least 5 chars long
    body('password', "password must me more than 4 digits").isLength({ min: 5 }),

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send("There is some kind of validation problem");
        }
        try {
            // check whether the user is already exists or not....
            let user = await User.findOne({address: req.body.address});
            if(user){
                return res.status(400).send("Account aleady exists try login")
            }
            // storing salt for adding it to the passowrd
            const salt = await bcrypt.genSalt(10);

            //hasing password and generating secure password using salts.
            const secPass =  await bcrypt.hash(req.body.password, salt);

            // creating user instance
            user = await User.create({
                name: req.body.name,
                address: req.body.address,
                password: secPass,
            })
            // creating data variable to store unique id created by database
            const data = {
                user:{
                    id:user.id
                }
            }


            // signing the id by our jwt secret
            const authToken = jwt.sign(data, JWT_SECRET);
            // sending back tocken as a response
            return res.status(200).send(authToken)
        }

        // printing the error to the console if any
        catch (err) {
            console.log("There is some kind of error in code:: " + err);
            return res.status(500).send("Internal server error");
        }
    })



// Route 2: loging user
router.post("/loginuser",
    // address must be an address
    body('address', "Please enter a valid address").isLength({ min: 25}),
    // password must be at least 5 chars long
    body('password', "password must me more than 4 digits").isLength({ min: 5 }),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }
        try {
            //Decomposing email and password out of the request.
            const {address, password} = req.body;

            //finding users
            let user = await User.findOne({address:address});
            if(!user){
                return res.status(400).send("Please enter correct credentials");
            }
            // if there will be any matching user then comparing it's passwords
            const passwordCompare = await bcrypt.compare(password, user.password);

            //incase passwords doesn't matched....
            if(!passwordCompare){
                return res.status(400).send("Please enter correct credentials");
            }

            // now logging user 
            const data = {
                user:{
                    id: user.id,
                }
            }
            // now creating authentication token from user id and our secret jwt key
            const  authToken  = jwt.sign(data, JWT_SECRET);

            //sending token to store in browser and to sucessfully login user.
            return res.status(200).send(authToken)
        }

        // printing the error to the console if any
        catch (err) {
            console.log("There is some kind of error in code:: " + err);
            return res.status(500).send("Internal server error");
        }
    })



// Route 3: Getting user information
router.post("/getuser",
    fetchUser,
   async (req, res) => {
    try{
        const UserId = req.user.id;
        const userData = await User.findById(UserId)
        return res.status(200).send(userData);
        // catching error if any
      } catch (error){
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
      }
   }
)




//Route 4: Updating user information
router.put("/updateCredentials",
    fetchUser,
    async (req, res)=>{
        try{
            //destucturing names and password
            const {password, isVip} = req.body;

            // filter which data to change
            const updUser = {};
            if(password){updUser.password=password}
            if(isVip){updUser.isVip=isVip}


            // finding note through id
            let user = await User.findById(req.user.id);
            if(!user){ return res.status(404).send("No user found")};
    
            // updating note through id
            user = await User.findByIdAndUpdate(req.user.id, {$set: updUser}, {new: true});
            // sending json response through notes
            return res.json({user});


        }catch(error){
            console.log("There is something wrong");
            return res.status(500).send({error:"Internal server error"});
        }
    })




//Route 4: Updating user information
router.put("/updateUser",
    fetchUser,
    async (req, res)=>{
        try{
            console.log("The error is here: 1");
            console.log(req.body);
            // destucturing names and password
            const {name, aboutUser, profileImage, backImage} = req.body;

            console.log("The error is here: 2");
            // filter which data to change
            const updUser = {};
            if(name){updUser.name=name};
            if(aboutUser){updUser.aboutUser=aboutUser};
            if(profileImage){updUser.profileImg= profileImage};
            if(backImage){updUser.backImage=backImage};

            console.log("The error is here: 3")
            // finding user through id retrived through token
            let user = await User.findById(req.user.id);
            if(!user){ return res.status(404).send("There is something wrong with your credentials please login again")};

            console.log("The error is here: 4");
            // updating user through id
            user = await User.findByIdAndUpdate(req.user.id, {$set: updUser}, {new: true});
            console.log("There error is here 8");
            return res.json({user});
        }catch(error){
            console.log("There is something wrong");
            return res.status(500).send({error:"Internal server error"});
        }
    })


// Route 5: Fetching user by id
router.post("/getothers/:id", fetchUser, async(req, res)=>{

    try{
        // finding user from userId
        const user = await User.findById(req.params.id);
        if(!user) {return res.status(404).send("User Not found")};
        return res.status(200).send(user);
        // catching error if any
      } catch (error){
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
      }

})




router.put("/handleFollow/:id", fetchUser, async(req, res)=>{
    try {
        // Find the user by their id
        let user = await User.findById(req.params.id);
        // if not found 
        if (!user){ 
            return res.status(404).send("User not found Not Found") 
        }  

        // fing myself from my id
        let myProfile = await User.findById(req.user.id)
        if (!myProfile){
            return res.status(501).send("Internal server error")
        }

         // adding user's id to following's  list 
        let upMyProfile = {};
        upMyProfile.following = myProfile.following.set(myProfile.following.length, req.params.id)

        myProfile = await User.findByIdAndUpdate(req.user.id, {$set: upMyProfile}, {new: true})  
        
        
        // adding myId  to user's follower's list
        let updUser = {};
        updUser.followers = user.followers.set(user.followers.length, req.user.id)
        user = await User.findByIdAndUpdate(req.params.id, {$set: updUser}, {new: true})    

        // printing updated user to the 
        return res.status(200).send("Sucessfully Followed"); 
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


router.put("/unfollow/:id", fetchUser, async(req, res)=>{
    try {
        // Find the user by their id
        let user = await User.findById(req.params.id);
        // if not found 
        if (!user){ 
            return res.status(404).send("User  Not Found") 
        }  

        // fing myself from my id
        let myProfile = await User.findById(req.user.id)
        if (!myProfile){
            return res.status(501).send("Internal server error")
        }

        
        // removing user from myProfile's following list
         let upMyProfile = {}
         upMyProfile.following = [];
         // finding , removing and saving tweet id from user's retweet list into new list
         for (let i in myProfile.following){
             if (myProfile.following[i] === req.params.id){
                console.log(myProfile.following[i]);
             }
             else{
                upMyProfile.following.push(myProfile.following[i]);
             }
         }

        // removing myProfile from user's follower's list
         let newUser = {}
         newUser.followers = [];
         // finding , removing and saving tweet id from user's retweet list into new list
         for (let i in user.followers){
             if (user.followers[i] === req.user.id){
                console.log("id is matched and let you decied what to do");
                console.log(user.followers[i]);
             }
             else{
                newUser.followers.push(user.followers[i]);
             }
         }
        
         // ading new updated user to the database;;
        await User.findByIdAndUpdate(req.params.id, {$set: newUser}, {new: true})  
        // updating myself  
        await User.findByIdAndUpdate(req.user.id, {$set: upMyProfile}, {new: true})    

        // printing updated user to the 
        return res.status(200).send("Sucessfully unfollowed"); 
        
 
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})


// Getting recomendations.

router.get("/recomuser", fetchUser, async(req, res)=> {
    try{
        // fetching user 
        let user = await User.findById(req.user.id);
        if(!user){
            return res.status(401).send("Problem with accound! please login again")
        }
        // fetching all user's
          let allUsers = await User.find();
          let otherUsers = []
        // extracting other users not followed by me.
        for (let i in allUsers){
            if(!(user.following.find((item)=> item == allUsers[i]._id) && user._id !== allUsers[i]._id)){
                otherUsers.push(allUsers[i]);
            }
        }
        return res.status(200).send(otherUsers);
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Internal server error");
    }
})

module.exports = router;