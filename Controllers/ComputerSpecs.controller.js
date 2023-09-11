const { ComputerSpecs } = require('../Models/ComputerSpecs.model');

function createComputerSpecs(req,res) {

  const newComputerSpecs = new ComputerSpecs(req.body);

  newComputerSpecs.save()
  .then(() => {
      res.status(201).json({ message: 'Created successfully.' });
  })
  .catch((err) => {
      res.json({ error: err.message });
  });
}

async function readComputerSpecs(req,res) {
  const id = req.params.id;

  try{
    const status = await ComputerSpecs.findById(id);

    if (!status) {
      return res.status(404).json({ message: 'Computer not found.' });
    }

    res.status(200).json(status);
  } catch (err) {
    res.json({ error: err.message });
  }
}

async function updateComputerSpecs(req,res) {
  const id = req.params.id;
  const updatedFields = req.body;

  try{
    const status = await ComputerSpecs.findByIdAndUpdate( id, updatedFields, { new:true });

    if (!status) {
      return res.status(404).json({ message: 'Computer not found.' });
    }

    res.send('Updated.');
  } catch (err) {
    res.json({ error: err.message });
  }
}

async function deleteComputerSpecs(req,res) {
  const id = req.params.id;

  try{
    const status = await ComputerSpecs.findByIdAndDelete(id);

    if (!status) {
      return res.status(404).json({ message: 'Computer not found.' });
    }

    res.send('Deleted.');
  } catch (err) {
    res.json({ error: err.message });
  }
}


module.exports = {
  createComputerSpecs,
  readComputerSpecs,
  updateComputerSpecs,
  deleteComputerSpecs
};
