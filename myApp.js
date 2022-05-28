//importing the required modules
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
require("dotenv").config(); //importing the dotenv module
console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}))

//Giving access to static assets
app.use("/public", express.static(__dirname + "/public"));

// request logger middleware
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//Index get route
app.get("/", function (req, res) {
  //sending index.html
  res.sendFile(__dirname + "/views/index.html");
});

// /json get rote
app.get("/json", function (req, res) {
  //sending json
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase"
        ? "Hello json".toUpperCase()
        : "Hello json",
  });
});

// time server using middleware
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date();
    next();
  },
  function (req, res) {
    res.json({
      time: req.time,
    });
  }
);
// route parameter
app.get("/:word/echo", function (req, res) {
  res.json({
    echo: req.params.word,
  });
});

//query parameter
app.route("/name").get((req, res) => {
  res.json({
    name: req.query.first + " " + req.query.last,
  });
}).post(function (req, res) {
    res.json({
        "name": req.body.first + " " + req.body.last
    })
});

module.exports = app;
