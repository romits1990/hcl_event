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
        },
        errorMessage: 'Original password is mandatory.'
    },
    newPassword: {
        trim: true,
        exists: true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'Password should be at least 7 chars long.'
        },
        errorMessage: 'New password is mandatory.'
    },
    passwordConfirmation:  {
        trim: true,
        exists: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(value!==req.body.newPassword) {
                    throw new Error('Password confirmation does not match new password.');
                }
                return true;
            }
        }
    }
}