const mongoose = require('../db');
const Schema = mongoose.Schema;

const computerSpecsSchema = new Schema({
  brand: String,
  computer: {
    type: Schema.Types.ObjectId,
    ref: 'ComputerStatus',
    require: true
  },
  model: String,
  processor: String,
  ram: String,
  storage: String,
  graphicsCard: String,
});

const ComputerSpecs = mongoose.model('ComputerSpecs', computerSpecsSchema);

module.exports = { ComputerSpecs };