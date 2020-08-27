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
  like: {
    type: Integer,
  },
  lat: {
    type: Integer,
    default: NULL,
  },
  long: {
    type: Integer,
    default: NULL,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema)