const express = require('express');
const router = express.Router();
const mongoose = require('../db');
const studentSchema = require('../Models/User.model');
const Student = mongoose.model('Student', studentSchema);


function createUser(req,res) {
    const { studentId, name, password, email } = req.body;

    const studentSchema = new Student({
        "studentId": studentId,
        "name": name,
        "password": password,
        "email": email
    });

    studentSchema.save()
    .then(() => {
        // Respond with a status code 201 (Created) on success
        res.status(201).json({ message: 'Student created successfully' });
    })
    .catch((err) => {
        // Handle any errors that occur during the save process
        res.status(500).json({ error: err.message });
    });
}

// router.get('/read', (req,res) => {
//     res.send('read');
// })

// router.get('/update', (req,res) => {
//     res.send('update');
// })

// router.get('/delete', (req,res) => {
//     res.send('delete');
// })



module.exports = {createUser}
