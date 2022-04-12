const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../credentials");

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and id to req object
    const token = req.header("auth-token");
    if (!token){
        res.status(401).send({error: "Failed: invalid login credentials"});
    }
    try{
        // verify the data with token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: "Failed: invalid login credentials"})
    }
}
module.exports = fetchUser;