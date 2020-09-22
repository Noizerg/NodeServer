var express = require("express");
const mongoose = require("mongoose");
var app = express();
var log = require("./libs/log")(module);

app.get("/api", function (req, res) {
  res.send("API is running");
});

app.use(function (req, res, next) {
  res.status(404);
  log.debug("Not found URL: %s", req.url);
  res.send({ error: "Not found" });
  return;
});

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://Bitskins:Siebel123@cluster0.soywg.gcp.mongodb.net/Bitskins_db?retryWrites=true&w=majority",
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
var db = mongoose.connection;
db.on("error", function (err) {
  log.error("connection error:", err.message);
});
db.once("open", function callback() {
  log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas

var Items = new Schema({
  HASH_NAME: { type: String, required: true },
  BO_PRICE: { type: String, required: true },
  SELL_PRICE: { type: String, required: true },
});

var ItemsModel = mongoose.model("Items", Items);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  log.error("Internal error(%d): %s", res.statusCode, err.message);
  res.send({ error: err.message });
  return;
});

app.get("/ErrorExample", function (req, res, next) {
  next(new Error("Random error!"));
});

app.get("/api/Items", function (req, res) {
  return ItemsModel.find(function (err, Items) {
    if (!err) {
      return res.send(Items);
    } else {
      res.statusCode = 500;
      log.error("Internal error(%d): %s", res.statusCode, err.message);
      return res.send({ error: "Server error" });
    }
  });
});

app.post("/api/Items", function (req, res) {
  var article = new ItemsModel({
    HASH_NAME: req.body.HASH_NAME,
    BO_PRICE: req.body.BO_PRICE,
    SELL_PRICE: req.body.SELL_PRICE,
  });
});
