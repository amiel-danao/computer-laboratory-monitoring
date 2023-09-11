const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/user', routes);
app.use('/computer', routes);
app.use('/log', routes);
app.use('/specs', routes);
app.use('/qr', routes);
app.use('/student', routes);

app.listen(3000);