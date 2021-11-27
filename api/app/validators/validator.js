const { checkSchema, validationResult } = require('express-validator');
const responseHandler = require('../helpers/responseHelper');

const parseValidationErrors = (req, res, next) => {
    const result = validationResult(req);
    if(result.isEmpty()) {
        next();
    }
    else {
        let errorMessage = result.array().map(item=>item.msg).join(', ');
        let errorBody = {};
        result.array().forEach(item=>{
            let { param, msg } = item;
            let error = { [param]: { message: msg } };
            Object.assign(errorBody, error)
        });
        responseHandler.handleErrorResponse({ body: errorBody }, res, "BAD_REQUEST", errorMessage);
    }
}

exports.run = (schemaName) => {
    let schema = require(`./validationSchemas/${schemaName}`).schema;
    return [checkSchema(schema), parseValidationErrors];
}