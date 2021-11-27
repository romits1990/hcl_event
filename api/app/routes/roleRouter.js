const express = require('express');
const router = express.Router({ mergeParams: true });

const roleController = require('../controllers/roleController');
const jwtValidator = require('../validators/jwtValidator');
const requestValidator = require('../validators/validator');

router.post('/', jwtValidator, requestValidator.run('roleCreateSchema'), roleController.create);
router.get('/', jwtValidator, requestValidator.run('listingSchema'), roleController.list);
router.get('/count', jwtValidator, roleController.count);

router.get('/:id', jwtValidator, requestValidator.run('roleDetailsSchema'), roleController.details);
router.patch('/:id', jwtValidator, requestValidator.run('roleUpdateSchema'), roleController.update);
router.delete('/:id', jwtValidator, requestValidator.run('roleDeleteSchema'), roleController.delete);

module.exports = router;