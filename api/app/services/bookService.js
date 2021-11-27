const Book = require('../models/bookModel');

class BookService {
    constructor() {

    }

    list(queryOption, sortOption, page, limit) {
        return Book.find(queryOption)
                            .sort(sortOption)
                            .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
                            .limit(parseInt(limit, 10)).lean().exec();
    }

    getUserCount(filter = {}) {
        return Book.countDocuments(filter);
    }
}

module.exports = BookService;