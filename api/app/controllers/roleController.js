const mongoose = require('mongoose');
const responseHandler = require('../helpers/responseHelper');
const Role = require('../models/roleModel');

exports.create = async (req, res, next) => {
    try {
        let { displayName = null, name = null } = req.body;
        let newRole = new Role({ displayName: displayName, name: name });
        await newRole.save();
        responseHandler.handleSuccessResponse(newRole, res, "RESOURCE_CREATED", 'Role created successfully.')
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res);
    }
};

exports.list = async (req, res, next) => {
    try {
        let { page = 1, limit = 10, sortDirection = 'desc', searchQuery = '' } = req.query || {};
        let sortOption = { createdAt: sortDirection };
        let queryOption = searchQuery.length > 0 ? { displayName: new RegExp(searchQuery, 'i') } : {};
        let mainQuery = Role.find(queryOption)
                            .sort(sortOption)
                            .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
                            .limit(parseInt(limit, 10)).lean();
        let data = req._isAdminUser ? await mainQuery.exec() : await mainQuery.where("name").ne('admin').exec();
        let message = data.length > 0 ? 'Data found.' : 'No Data found.';
        responseHandler.handleSuccessResponse(data, res, 'SUCCESS', message);
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res);
    }
};

exports.count = async (req, res, next) => {
    try {
        let roleCount = await Role.countDocuments();
        let response = { count: roleCount };
        responseHandler.handleSuccessResponse(response, res, 'SUCCESS');
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res);
    }
}

exports.details = async (req, res, next) => {
    try {
        let { id } = req.params;
        let role = await Role.findById(id);
        if(role!==null) {
            let message = 'Data found.';
            responseHandler.handleSuccessResponse(role, res, 'SUCCESS', message);
        }
        else {
            responseHandler.handleErrorResponse({}, res, 'NOT_FOUND', "Role doesn't exist.");
        }
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res);
    }
}

exports.update = async (req, res, next) => {
    try {
        let { id: roleId = null } = req.params;
        let { displayName = null } = req.body || {};
        let roleCount = await Role.countDocuments( { _id: roleId } );
        if(roleCount===1) {
            let filterQuery = { _id: roleId };
            let dataToUpdate = { displayName: displayName };
            let updateResponse = await Role.updateOne(filterQuery, { $set: dataToUpdate }, { new: true });
            let successMessage = updateResponse.modifiedCount > 0 ? "Role updated successfully." : "Nothing to update";
            responseHandler.handleSuccessResponse({}, res, "SUCCESS", successMessage);
        }
        else {
            responseHandler.handleErrorResponse({}, res, 'NOT_FOUND');
        }
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res);
    }
}

exports.delete = async (req, res, next) => {
    try {
        let {id: roleId = null} = req.params || {};
        let roleCount = await Role.countDocuments({ _id: roleId, name: { $ne: 'admin' } });
        if(roleCount > 0) {
            let transactionSession = await mongoose.startSession();
            transactionSession.startTransaction();
            await Role.deleteOne({_id: roleId});
            await transactionSession.commitTransaction();
            transactionSession.endSession();
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