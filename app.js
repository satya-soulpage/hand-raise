const express = require("express");
var cookieParser = require('cookie-parser');
const app = express();
// var mongoose = require("mongoose");
var indexRouter = require('./routes/index');
// var Sequelize = require('sequelize')
app.use(express.json());
app.use(cookieParser());




//set the template engine ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

//routes
app.use("/api", indexRouter);
app.get("/", (req, res) => {
  res.render("index");
});

//Listen on port 3000
server = app.listen(3000);

//socket.io instantiation
const io = require("socket.io")(server);

//listen on every connection
io.on("connection", (socket) => {
  console.log("New user connected");



  //listen on handraise
  socket.on("hand", (data) => {
    console.log(1)
    io.sockets.emit("hand-raise", {
      url: data.url,
    });
  });
  

  
});
module.exports = app;