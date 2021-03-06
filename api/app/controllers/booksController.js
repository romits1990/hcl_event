const debug = require('debug')('hcl:Book_CONTROLLER');
const responseHandler = require('../helpers/responseHelper');
const BookService = require('../services/bookService');
const bookServiceInstance = new BookService();

exports.list = async (req, res, next) => {
  try {
    let userRole = req._role;
    let { page = 1, limit = 10, sortDirection = 'desc', searchQuery = '' } = req.query || {};
    let sortOption = { title: sortDirection };
    let searchBy = searchQuery.length > 0 ? new RegExp(searchQuery, 'i') : null;
    let listingOptions = [searchBy, sortOption, page, limit];
    let allUsers = await bookServiceInstance.list(...listingOptions);
    let message = (allUsers.length > 0 ? 'Data found.' : 'No Data found.') + ` FOR ROLE - ${userRole}`;
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
