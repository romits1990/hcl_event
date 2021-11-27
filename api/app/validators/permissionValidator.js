const responseHandler = require("../helpers/responseHelper");
const Permission = require("../models/permissionModel");
const debug = require('debug')('erm:permission');

const canUserAccess = async (userId, roleId, req) => {
    let { method, path, baseUrl  } = req;
    let existingPermission = await Permission.findOne({
        role: roleId,
        resource: baseUrl.replace('/', ''),
        actions: method.toLowerCase().trim()
    });
    return existingPermission!==null;
}

module.exports = async (req, res, next) => {
    try {
        const { id: userId = null, roleId = null, name: roleName = null } = req._decodedToken;
        if(roleName.toLowerCase()==='admin') {
            // allow admin to access averything
            next();
        }
        else {
            // fetch permissions and check if role is allowed
            let userCanAccess = await canUserAccess(userId, roleId, req);
            if(userCanAccess===true) {
                next();
            }
            else {
                responseHandler.handleErrorResponse({}, res, "FORBIDDEN", "Permission denied.");
            }
        }
    }
    catch(error) {
        responseHandler.handleErrorResponse(error, res, "INTERNAL_ERROR", "Internal Error occurred.");
    }
}