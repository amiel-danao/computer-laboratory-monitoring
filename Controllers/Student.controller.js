const { Student } = require('../Models/Student.model');

function createStudent(req,res) {

  const newStudent = new Student(req.body);

  newStudent.save()
  .then(() => {
      res.status(201).json({ message: 'User created successfully.' });
  })
  .catch((err) => {
      res.json({ error: err.message });
  });
}

async function readStudent(req,res) {
  const id = req.params.id;

  try{
    const status = await Student.findById(id);

    if (!status) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(status);
  } catch (err) {
    res.json({ error: err.message });
  }
}

async function updateStudent(req,res) {
  const id = req.params.id;
  const updatedFields = req.body;

  try{
    const status = await Student.findByIdAndUpdate( id, updatedFields, { new:true });

    if (!status) {
      return res.status(404).json({ message: 'Computer not found.' });
    }

    res.send('Updated.');
  } catch (err) {
    res.json({ error: err.message });
  }
}

async function deleteStudent(req,res) {
  const id = req.params.id;

  try{
    const status = await Student.findByIdAndDelete(id);

    if (!status) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.send('Deleted.');
  } catch (err) {
    res.json({ error: err.message });
  }
}

module.exports = {
  createStudent,
  readStudent,
  updateStudent,
  deleteStudent
};