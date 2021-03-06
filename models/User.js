const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  articles:[{
    type: Schema.Types.ObjectId,
    ref:'Article'
  }],
  comments:[{
    type: Schema.Types.ObjectId,
    ref:'Comment'
  }],
  likedArticles:[
    {
      articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
      },
      value: {
        type: Boolean
      }
    }
  ],
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  checkIns: [{
    type: Schema.Types.ObjectId,
    ref: 'CheckIn',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;