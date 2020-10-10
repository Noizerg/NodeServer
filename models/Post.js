const mongoose = require("mongoose");

var Schema = mongoose.Schema;


var PostSchema = new Schema({
    HASH_NAME: { type: String, required: true },
    BO_PRICE: { type: String, required: true },
    SELL_PRICE: { type: String, required: true },
  });
  


module.exports = mongoose.model('CS_GO_ITEMS', PostSchema);