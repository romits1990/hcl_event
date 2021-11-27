exports.schema = {
    id: {
        trim: true,
        isMongoId: true,
        exists: true,
        errorMessage: 'Please provide a valid role id.'
    }
}