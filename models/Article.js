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
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislike: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
<<<<<<< HEAD
=======
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
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