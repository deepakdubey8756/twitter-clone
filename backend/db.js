const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://deepakdubey:MYpassisdeepak8756@cluster0.ktvnl.mongodb.net/twitter-backend?retryWrites=true&w=majority`;


const connectToMongo = () => {
    mongoose.connect(mongoURI, (err)=>{
        if (err){
            console.log("failed to load database");
            return;
        }
        console.log("connected to mongodb sucessfully");
    })
}
module.exports = connectToMongo;
