const config = require("config");

const MONGODB_URI = (process.env.MONGODB_URI) ?
  (process.env.MONGODB_URI) :
  config.get('mongodbURI');

var mongoose = require("mongoose");
mongoose.connect(MONGODB_URI);
module.exports = mongoose;
