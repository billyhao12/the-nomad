const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  byline: {
    type: String,
    max: 250,
    required: true,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  // like: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  // dislike: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  lat: {
    type: Number,
    default: null,
  },
  long: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;