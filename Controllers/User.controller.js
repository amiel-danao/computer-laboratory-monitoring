const { User } = require('../Models/User.model');

function createUser(req,res) {

    const newUser = new User(req.body);

    newUser.save()
    .then(() => {
        res.status(201).json({ message: 'User created successfully.' });
    })
    .catch((err) => {
        res.json({ error: err.message });
    });
}

async function readUser(req, res) {
    const userId = req.params.userId;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function updateUser(req, res) {
    const userId = req.params.userId;
    const updatedFields = req.body;

    try {
        const user = await User.findOneAndUpdate({ userId }, updatedFields, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.userId;

    try {
        const user = await User.findOneAndDelete({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.send('The user has been successfully deleted.');
    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
};