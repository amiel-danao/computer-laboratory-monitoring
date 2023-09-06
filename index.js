const express = require('express');
const app = express();
const userController = require('./Controllers/User.controller');const mongoose = require('./db');
// const createUser = require('./Controllers/User.controller');
const router = express.Router();
const studentRoutes = require('./routes/routes');
const bodyParser = require('body-parser'); // Import body-parser

app.use(bodyParser.json());
// Use the routes in your application
app.use('/api', studentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Ok'});
})

// app.use('/', userController)
// app.post('/', createUser)
// app.post('/', createUser)

app.listen(3000)
