const mongoose = require('../db');
const Schema = mongoose.Schema;

const computerLogSchema = new Schema({
  computer: {
    type: Schema.Types.ObjectId,
    ref: 'ComputerStatus',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  logType: {
    type: String,
    enum: ['login', 'logout'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const ComputerLog = mongoose.model('ComputerLog', computerLogSchema);

module.exports = { ComputerLog };