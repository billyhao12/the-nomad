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
<<<<<<< HEAD
  checkIn: [{
      type: Schema.Types.ObjectId,
=======
  checkIns: [{
    type: Schema.Types.ObjectId,
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
    ref: 'CheckIn',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;