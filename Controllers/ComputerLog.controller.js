const { ComputerLog } = require('../Models/ComputerLog.model');

function createComputerLog(req,res) {

    const newComputerLog = new ComputerLog(req.body);

    newComputerLog.save()
    .then(() => {
        res.status(201).json({ message: 'Log created successfully.' });
    })
    .catch((err) => {
        res.json({ error: err.message });
    });
}

async function readComputerLog(req,res) {
    const id = req.params.id;

    try {
        const log = await ComputerLog.findById(id);

        if (!log) {
            return res.status(404).json({ message: 'Computer not found.' });
        }

        res.status(200).json(log);
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function updateComputerLog(req,res) {
    const id = req.params.id;
    const updatedFields = req.body;

    try {
        const log = await ComputerLog.findByIdAndUpdate( id, updatedFields, { new:true });

        if (!log) {
            return res.status(404).json({ message: 'Computer not found.' });
        }

        res.status(200).json(log);
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function deleteComputerLog(req,res) {
    const id = req.params.id;

    try {
        const log = await ComputerLog.findByIdAndDelete(id);

        if (!log) {
            return res.status(404).json({ message: 'Computer not found.' });
        }

        res.send('The computer log has been successfully deleted.');
    } catch (err) {
        res.json({ error: err.message });
    }
}

module.exports = {
    createComputerLog,
    readComputerLog,
    updateComputerLog,
    deleteComputerLog
};