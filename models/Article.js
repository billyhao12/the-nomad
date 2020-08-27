const mongoose = require('mongoose');
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
    type: Number,
  },
  lat: {
    type: Number,
    default: null,
  },
  long: {
    type: Number,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;