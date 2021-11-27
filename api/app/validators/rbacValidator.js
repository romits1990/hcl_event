const responseHandler = require("../helpers/responseHelper");
const staticRoles = require("../configurations/staticRoles").config;
const debug = require('debug')('erm:permission');

const canUserAccess = (role) => {
    if(!role){
        return false;
    }
    return staticRoles.includes(role);
}

module.exports = async (req, res, next) => {
    try {
        const { authorization = null } = req.headers;
            
        let roleNameToCompareWith = authorization.replace('ROLE_TOKEN_', '').toLowerCase().trim();
        if(canUserAccess(roleNameToCompareWith)) {
            req._role = roleNameToCompareWith;
            next();
        }
        else {
            responseHandler.handleErrorResponse({}, res, "FORBIDDEN", "Permission denied.");
        }
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res, "INTERNAL_ERROR", "Internal Error occurred.");
    }
}