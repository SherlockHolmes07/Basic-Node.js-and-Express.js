//importing the required modules
let express = require('express');
let app = express();
require('dotenv').config() //importing the dotenv module
console.log("Hello World");

//Giving access to static assets
app.use("/public", express.static(__dirname + "/public"));

//Index get route
app.get("/", function(req, res){
    //sending index.html
    res.sendFile(__dirname + "/views/index.html");
})

// /json get rote
app.get("/json", function(req, res){
    //sending json
    res.json({
        "message": process.env.MESSAGE_STYLE === "uppercase" ? "Hello json".toUpperCase() : "Hello json"
    });
})




























 module.exports = app;
