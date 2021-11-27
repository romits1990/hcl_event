const mongoose = require("mongoose");
const jwtHelper = require('../helpers/jwtHelper');
const responseHandler = require('../helpers/responseHelper');

const validateDecodedTokenDetails = (token) => {
    let status = false;
    if(token) {
        let { id: userId = null, roleId = null, name: roleName = null } = token;
        status = userId &&
                 roleId &&
                 roleName &&
                 mongoose.isValidObjectId(userId) &&
                 mongoose.isValidObjectId(roleId);
    }
    return status;
};

module.exports = async (req, res, next) => {
    try {
        const { authorization = null } = req.headers;
        if(authorization) {
            let token = authorization.replace(/^Bearer\s/, '');
            let decodedData = jwtHelper.verifyAndDecode(token);
            if(decodedData!==false && validateDecodedTokenDetails(decodedData) ) {
                req._decodedToken = decodedData;
                req._isAdminUser = decodedData.name.toLowerCase().trim()==='admin';
                next();
            }
            else {
                responseHandler.handleErrorResponse({}, res, "UNAUTHORIZED", "Invalid auth token.");
            }
        }
        else {
            responseHandler.handleErrorResponse({}, res, "UNAUTHORIZED", "Authorization header is missing.");
        }
    }
    catch(error) {
        responseHandler.handleErrorResponse({}, res, "INTERNAL_ERROR", "Internal Error occurred.");
    }
}