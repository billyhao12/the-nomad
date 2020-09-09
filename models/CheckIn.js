const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckInSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lat: {
    type: String,
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