const express = require('express');
const router = express.Router({ mergeParams: true });

const userController = require("../controllers/userController");
const jwtValidator = require('../validators/jwtValidator');
const requestValidator = require('../validators/validator');

router.post('/', jwtValidator, requestValidator.run('userCreateSchema'), userController.create);
router.get('/', jwtValidator, requestValidator.run('listingSchema'), userController.listUsers);
router.get('/count', jwtValidator, userController.userCount);
router.post('/login', requestValidator.run('authenticationSchema'), userController.authenticate);
router.get('/:id', jwtValidator, requestValidator.run('userDetailsSchema'), userController.userDetails);
router.patch('/:id', jwtValidator, requestValidator.run('userUpdateSchema'), userController.update);
router.delete('/:id', jwtValidator, requestValidator.run('userDeleteSchema'), userController.delete);

module.exports = router;
