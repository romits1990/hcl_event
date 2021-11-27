exports.schema = {
    id: {
        trim: true,
        isMongoId: true,
        exists: true,
        errorMessage: 'Please provide a valid role id.'
    },
    displayName: {
        trim: true,
        exists: true,
        isLength: {
            errorMessage: 'Role display name should be at least 3 chars long',
            options: { min: 3 }
        },
        errorMessage: 'Role display name is mandatory.',
    }
}