const mongoose = require('../db');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  studentID: String,
  computer: { type: mongoose.Schema.Types.ObjectId, ref: 'ComputerStatus' },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };