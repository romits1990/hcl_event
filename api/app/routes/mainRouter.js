const express = require('express');
const mainRouter = express.Router();

const userRouter = require('../routes/userRouter');
const roleRouter = require('../routes/roleRouter');

mainRouter.get('/', (req, res, next) =>  res.json({ message: 'HCL EVENT' }));
mainRouter.use('/users', userRouter);
mainRouter.use('/roles', roleRouter);
mainRouter.all('*', (req, res) => res.status(404).json({message: 'Invalid route'}));

module.exports = mainRouter;