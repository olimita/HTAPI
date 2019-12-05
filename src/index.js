const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

const { port } = require('./configs/config');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);
console.log('Server on port', port);

// Routes
app.use(require('./routes/index'));


