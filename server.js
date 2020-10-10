var express = require("express");
const mongoose = require("mongoose");
var app = express();
var log = require("./libs/log")(module);
require('dotenv/config');
const postsRoute = require('./routes/posts');
const cors = require('cors');

const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postsRoute);

var db = mongoose.connection;
db.on("error", function (err) {
  log.error("connection error:", err.message);
});
db.once("open", function callback() {
  log.info("Connected to DB!");
});



async function start() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION,      
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );

    app.listen(1337, () => {
      console.log("Server has been started");
    });
  } catch (e) {
    console.log(e);
  }
}

start();



