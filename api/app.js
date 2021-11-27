const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('combined', { stream: accessLogStream }));

const errorHandler = require('./app/helpers/errorHandlerHelper');
app.use(errorHandler);

const mainRouter = require('./app/routes/mainRouter');
app.use('/', mainRouter);

module.exports = app;
