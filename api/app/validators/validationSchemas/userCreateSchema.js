exports.schema = {
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
            errorMessage: 'Name should be at least 3 chars long',
            options: { min: 3 }
        },
        errorMessage: 'Name is mandatory.',
    },
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
            errorMessage: `Password should be at least 7 chars long`
        }
    },
    passwordConfirmation: {
        trim: true,
        exists: true,
        custom: {
            options: ( value, { req, location, path } ) => {
                if(value!==req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            }
        }
    }
}