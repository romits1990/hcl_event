const debug = require('debug')('hcl:USER_CONTROLLER');
const responseHandler = require('../helpers/responseHelper');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

const userService = require('../services/userService');
const userServiceInstance = new userService();

exports.create = async (req, res, next) => {
  try {
    let newUser = await userServiceInstance.create(req.body);
    responseHandler.handleSuccessResponse(newUser, res, "RESOURCE_CREATED", 'User created successfully.')
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, sortDirection = 'desc', searchQuery = '' } = req.query || {};
    let sortOption = { createdAt: sortDirection };
    let queryOption = searchQuery.length > 0 ? { name: new RegExp(searchQuery, 'i') } : {};
    let listingOptions = [queryOption, sortOption, page, limit];
    let allUsers = await userServiceInstance.list(...listingOptions);
    let message = allUsers.length > 0 ? 'Data found.' : 'No Data found.';
    responseHandler.handleSuccessResponse(allUsers, res, 'SUCCESS', message);
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res, "INTERNAL_ERROR");
  }
}

exports.userDetails = async (req, res, next) => {
  try {
    let { id } = req.params;
    let user = await userServiceInstance.getUserById(id);
    if(user!==null) {
      let message = 'Data found.';
      responseHandler.handleSuccessResponse(user || {}, res, 'SUCCESS', message);
    }
    else {
      responseHandler.handleErrorResponse({}, res, 'NOT_FOUND', "User doesn't exist.");
    }
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res);
  }
}

exports.userCount = async (req, res, next) => {
  try {
    let userCount = await userServiceInstance.getUserCount();
    let response = { count: userCount };
    responseHandler.handleSuccessResponse(response, res, 'SUCCESS');
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res);
  }
}

exports.update = async (req, res, next) => {
  try {
    let { id: userId = null } = req.params;
    let { name = null, role = null } = req.body || {};
    let userCount = await userServiceInstance.getUserCount({ _id: userId });
    if(userCount===1) {
      let dataToUpdate = { name: name, role: role };
      let updatedUserResponse = await userServiceInstance.updateUserById(userId, dataToUpdate);
      let successMessage = updatedUserResponse.modifiedCount > 0 ? "User updated successfully." : "Nothing to update";
      responseHandler.handleSuccessResponse({}, res, "SUCCESS", successMessage);
    }
    else {
      responseHandler.handleErrorResponse({}, res, 'NOT_FOUND');
    }
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let { id: userId = null } = req.params;
    let user = await userServiceInstance.getNonAdminUserById(userId);
    if(user?.role) {
      let deleteResponse = await userServiceInstance.deleteUserById(userId);
      responseHandler.handleSuccessResponse({}, res, "SUCCESS_NO_CONTENT");
    }
    else {
      responseHandler.handleErrorResponse({}, res, 'NOT_FOUND');
    }
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res);
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    let { email = null, password = null } = req.body || {};
    let user = await User.findOne({email: email}).populate('role').exec();
    if(user!==null) {
      let hashedPassword = user.password;
      let userAuthStatus = await User.verifyPassword(hashedPassword, password);
      if(userAuthStatus===true) {
        let jwt = user.createJwtToken();
        let { name } = user;
        let data = { name: name };
        let headerOptions = {  Authorization: `Bearer ${jwt}` };
        responseHandler.handleSuccessResponse(data, res, "SUCCESS", "Login successfull.", headerOptions);
      }
      else {
        responseHandler.handleErrorResponse({}, res, "UNAUTHORIZED", "Wrong password.");
      }
    }
    else {
      responseHandler.handleErrorResponse({}, res, "UNAUTHORIZED", "User doesn't exist.");
    }
  }
  catch(error) {
    responseHandler.handleErrorResponse(error, res, "BAD_REQUEST", "Username and password is mandatory.");
  }
}
