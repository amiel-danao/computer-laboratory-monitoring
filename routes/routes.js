const express = require('express');
const router = express.Router();
const studentController = require('../controllers/User.controller'); // Import your controller

// Define the route and use the controller function
router.post('/students', [], studentController.createUser);

module.exports = router;
