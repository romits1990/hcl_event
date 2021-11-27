exports.schema = {
    id: {
        trim: true,
        isMongoId: true,
        exists: true,
        errorMessage: 'Please provide a valid user id.'
    },
    role: {
        trim: true,
        isMongoId: true,
        exists: true,
        errorMessage: 'Please provide a valid role id.'
    },
    name: {
        trim: true,
        exists: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'Name should be at least 3 chars long'
        },
        errorMessage: 'Name is mandatory.'
    }
}