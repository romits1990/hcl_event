const express = require('express');
const router = express.Router({ mergeParams: true });

const bookController = require("../controllers/booksController");
const rbacValidator =  require("../validators/rbacValidator");
const requestValidator = require('../validators/validator');

router.get('/', rbacValidator, requestValidator.run('listingSchema'), bookController.list);
router.get('/count', bookController.count);

module.exports = router;
