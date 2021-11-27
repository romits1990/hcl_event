const responseHandler = require("./responseHelper");

module.exports = (error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        let errorMessage = 'Only JSON content type allowed.';
        responseHandler.handleErrorResponse({ }, res, "BAD_REQUEST", errorMessage);
    }
    else {
        next();
    }
}