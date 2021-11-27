exports.schema = {
    name: {
        trim: true,
        exists: true,
        isLength: {
            errorMessage: 'Role name should be at least 3 chars long',
            options: { min: 3 }
        },
        custom: {
            options: (value, { req, location, path }) => {
                return value.toLowerCase()!=='admin';
            },
            errorMessage: 'Admin role creation not allowed.',
        },
        errorMessage: 'Role name is mandatory.',
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