const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckInSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lat: {
<<<<<<< HEAD
    type: String,
=======
    type: Number,
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
    required: true,
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

const CheckIn = mongoose.model('CheckIn', CheckInSchema);

module.exports = CheckIn