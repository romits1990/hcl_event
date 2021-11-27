const permissionConfig = require('../../configurations/permission.config').config;

exports.schema = {
    id: {
        trim: true,
        isMongoId: true,
        exists: true,
        errorMessage: 'Please provide a valid permission id.'
    },
    role: {
        trim: true,
        isMongoId: true,
        exists: true,
        errorMessage: 'Please provide a valid role id.'
    },
    resource: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                return permissionConfig.resources.includes(value);
            },
            errorMessage: 'Invalid resource.',
        }
    },
    actions: {
        custom: {
            options: (value, { req, location, path }) => {
                let allowedActions = permissionConfig.actions;
                return value.every(item=>allowedActions.includes(item));
            },
            errorMessage: `Only ${permissionConfig.actions} are allowed.`
        }
    }
}