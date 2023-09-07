const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/user', routes);
app.use('/computer', routes);
app.use('/log', routes);

app.listen(3000);