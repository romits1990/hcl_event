const express = require('express');
const mainRouter = express.Router();

const bookRouter = require('./bookRouter');

mainRouter.get('/', (req, res, next) =>  res.json({ message: 'HCL EVENT' }));
mainRouter.use('/books', bookRouter);
mainRouter.all('*', (req, res) => res.status(404).json({message: 'Invalid route'}));

module.exports = mainRouter;