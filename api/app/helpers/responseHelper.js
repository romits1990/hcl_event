const mongoose = require('mongoose');

const CODE_STATUS_MAP = require("../configurations/httpStatus.config").config;

exports.handleErrorResponse = (error, res, statusCode, msg, headerOptions) => {
    let errorResponse = {};
    if(error instanceof mongoose.Error) {
        switch(error.name) {
            case "ValidationError": 
                msg = "Invalid request.";
                statusCode = !statusCode ? "BAD_REQUEST" : statusCode;
                let parsedErrorBody = this.getMongooseValidationErrorBody(error);
                errorResponse = {
                    code: statusCode,
                    body: parsedErrorBody
                }
            break;
            default:
                msg = !msg ? "System error occurred." : msg;
                statusCode = !statusCode ? "INTERNAL_ERROR" : statusCode;
                errorResponse = {
                    code: statusCode,
                    body: {}
                }
                break;
        }
    }
    else {
        msg = !msg ? "System error occurred." : msg;
        statusCode = !statusCode ? "INTERNAL_ERROR" : statusCode;
        errorResponse = {
            code: statusCode,
            body: error?.body || {}
        }
    }

    res.status(CODE_STATUS_MAP[statusCode]).json(
        {
            message: msg,
            error: errorResponse,
            data: {},
        }
    );
}

exports.handleSuccessResponse = (data, res, statusCode, msg, headerOptions) => {
    for(option in headerOptions) {
        res.header(option, headerOptions[option]);
    }
    if(statusCode==='SUCCESS_NO_CONTENT') {
        res.status(CODE_STATUS_MAP[statusCode]).send();
    }
    else {
        res.status(CODE_STATUS_MAP[statusCode]).json(
            {
                message: msg,
                data: data,
                error: {}
            }
        );
    }
}

exports.getMongooseValidationErrorBody = (mongooseValidationError) => {
    let parsedError = {};
    try {
        if(mongooseValidationError instanceof mongoose.Error) {
            let mongooseErrors = mongooseValidationError?.errors;
            if(mongooseErrors) {
                for(prop in mongooseErrors) {
                    parsedError[prop] = {
                        message: mongooseErrors[prop].message
                    }
                }
            }
        }
    }
    catch(error) {

    }
    return parsedError;
}