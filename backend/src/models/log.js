const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
  content: {
  type: String,
  required: true
  },
  tags: {
    type: [String],
    default: []
  },
  streakCount: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Log', LogSchema);