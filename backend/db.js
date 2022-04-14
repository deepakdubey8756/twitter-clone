const mongoose = require("mongoose");
const mongoURI = "Enter you url here to connect to mongodb cloud or local"

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
