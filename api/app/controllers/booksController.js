const debug = require('debug')('hcl:Book_CONTROLLER');
const responseHandler = require('../helpers/responseHelper');
const BookService = require('../services/bookService');
const bookServiceInstance = new BookService();

exports.list = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, sortDirection = 'desc', searchQuery = '' } = req.query || {};
    let sortOption = { title: sortDirection };
    let queryOption = searchQuery.length > 0 ? { name: new RegExp(searchQuery, 'i') } : {};
    let listingOptions = [queryOption, sortOption, page, limit];
    let allUsers = await bookServiceInstance.list(...listingOptions);
    let message = allUsers.length > 0 ? 'Data found.' : 'No Data found.';
    responseHandler.handleSuccessResponse(allUsers, res, 'SUCCESS', message);
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res, "INTERNAL_ERROR");
  }
}

exports.count = async (req, res, next) => {
  try {
    let userCount = await bookServiceInstance.getUserCount();
    let response = { count: userCount };
    responseHandler.handleSuccessResponse(response, res, 'SUCCESS');
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res);
  }
}
