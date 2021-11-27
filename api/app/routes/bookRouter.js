const express = require('express');
const router = express.Router({ mergeParams: true });

const bookController = require("../controllers/booksController");
const requestValidator = require('../validators/validator');

router.get('/', requestValidator.run('listingSchema'), bookController.list);
router.get('/count', bookController.count);

module.exports = router;
