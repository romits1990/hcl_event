exports.schema = {
    email: {
        normalizeEmail: true,
        trim: true,
        exists: true,
        isEmail: true,
        errorMessage: 'Please provide proper email id.'
    },
    password: {
        trim: true,
        exists: true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'Password should be at least 7 chars long'
        }
    }
}