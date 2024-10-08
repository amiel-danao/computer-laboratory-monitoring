const express = require('express');
const router = express.Router();
const { createUser, readUser, updateUser, deleteUser } = require('../controllers/User.controller');
const { createComputerStatus, readStatus, updateStatus, deleteStatus } = require('../Controllers/ComputerStatus.controller');
const { createComputerLog, readComputerLog, updateComputerLog, deleteComputerLog } = require('../Controllers/ComputerLog.controller');
const { createComputerSpecs, readComputerSpecs, updateComputerSpecs, deleteComputerSpecs } = require('../Controllers/ComputerSpecs.controller');
const { generateQR } = require('../Controllers/QR.controller');
const { createStudent, readStudent, updateStudent, deleteStudent } = require('../Controllers/Student.controller');

router.post('/create', [], createUser);
router.get('/read/:userId', [], readUser);
router.patch('/update/:userId', [], updateUser);
router.delete('/delete/:userId', [], deleteUser);

router.post('/status', [], createComputerStatus);
router.get('/read_status/:computerId', [], readStatus);
router.patch('/update_status/:computerId', [], updateStatus);
router.delete('/delete_status/:computerId', [], deleteStatus);

router.post('/create_log', [], createComputerLog);
router.get('/read_log/:id', [], readComputerLog);
router.patch('/update_log/:id', [], updateComputerLog);
router.delete('/delete_log/:id', [], deleteComputerLog);

router.post('/create_specs', [], createComputerSpecs);
router.get('/read_specs/:id', [], readComputerSpecs);
router.patch('/update_specs/:id', [], updateComputerSpecs);
router.delete('/delete_specs/:id', [], deleteComputerSpecs);

router.post('/create_student', [], createStudent);
router.read('/read_student/:id', [], readStudent);
router.patch('/update_student/:id', [], updateStudent);
router.delete('/delete_student/:id', [], deleteStudent);

router.get('/scan/:computerId', [], generateQR);

module.exports = router;