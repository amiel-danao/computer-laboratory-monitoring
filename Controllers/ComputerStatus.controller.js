const { ComputerStatus } = require('../Models/ComputerStatus.model');

function createComputerStatus(req,res) {

    const newComputerStatus = new ComputerStatus(req.body);

    newComputerStatus.save()
    .then(() => {
        res.status(201).json({ message: 'Status created successfully.' });
    })
    .catch((err) => {
        res.json({ error: err.message });
    });
}

async function readStatus(req, res) {
    const computerId = req.params.computerId;

    try {
        const status = await ComputerStatus.findOne({ computerId });

        if (!status) {
            return res.status(404).json({ message: 'Computer not found.' });
        }

        res.status(200).json(status);
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function updateStatus(req, res) {
    const computerId = req.params.computerId;
    const updatedFields = req.body;

    try {
        const status = await ComputerStatus.findOneAndUpdate({ computerId }, updatedFields, { new: true });

        if (!status) {
            return res.status(404).json({ message: 'Computer not found.' });
        }

        res.status(200).json(status);
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function deleteStatus(req, res) {
    const computerId = req.params.computerId;

    try {
        const computer = await ComputerStatus.findOneAndDelete({ computerId });

        if (!computer) {
            return res.status(404).json({ message: 'Computer not found.' });
        }

        res.send('The computer status has been successfully deleted.');
    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
}

module.exports = {
    createComputerStatus,
    readStatus,
    updateStatus,
    deleteStatus
};