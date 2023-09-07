const mongoose = require('../db');
const Schema = mongoose.Schema;

const computerSchema = new Schema({
  computerId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'not available'],
    required: true
  },
});

const ComputerStatus = mongoose.model('ComputerStatus', computerSchema);

module.exports = { ComputerStatus };