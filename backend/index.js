// importing express for server
const express = require("express")
// Using cores module
const Cors = require("cors")
require("dotenv").config()

// importing bodyParser
const bodyParser = require("body-parser")

// importing the databse instance
const connectToMongo = require("./db")
connectToMongo();

const app = express()

// using middle ware cors
app.use(Cors())

// importing body parser
// Setting body parser
app.use(bodyParser.json({limit:"16mb"}))

app.use(bodyParser.urlencoded({limit:"16mb", extended: false }))


app.use(express.json())

//Availble routes 1: to handle authentication
app.use('/api/auth', require('./routes/auth'));

// Availble routes 2: to handle tweet
app.use("/api/tweets", require("./routes/tweet"));

// Availble routes 3: to handle replies.
app.use("/api/reply", require("./routes/reply"))



app.use("/api/notify", require("./routes/notify"))
app.get("/", (req, res) => {
    res.send("Hello, World!");
    
})



// listenting the backend on this port
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Example app listen on port`)
})
