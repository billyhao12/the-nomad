const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lat: {
    type: Integer,
    default: NULL,
  },
  lon: {
    type: Integer,
    default: NULL,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema)