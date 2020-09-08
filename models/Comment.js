const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  content: {
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
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;