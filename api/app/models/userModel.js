if(process.env.NODE_ENV!=='production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
// mongoose.set('debug', true)

const hashHelper = require("../helpers/hashHelper");
const jwtHelper = require("../helpers/jwtHelper");

const Role = require("./roleModel");

const { Schema } = mongoose;
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [ true, 'User name is mandatory.' ]
        },
        email: {
            type: String,
            required: [ true, 'Email id is mandatory' ],
            trim: true,
            validate: [
                {
                    validator: value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
                    message: props => `${props.value} is not a valid email id.`
                },
                {
                    validator: async (value) => {
                        let existingUser = await mongoose.model('User').findOne({email: value});
                        return existingUser===null;
                    },
                    message: props => `${props.value} is already taken.`
                }
            ]
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: [ true, 'User role is mandatory.' ],
            validate: {
                validator: async (value) => {
                    let roleExists = await Role.exists({ _id: value });
                    return roleExists;
                },
                message: props => `${props.value} is not a valid role id`
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const userDocument = this;
    if(userDocument.isModified()) {
        try {
            const hashedPassword = await hashHelper.hashText(this.password);
            userDocument.password = hashedPassword;
            next();
        }
        catch(error) {
            next(error);
        }
    }
    else{
        next();
    }
});

userSchema.pre('updateOne', async function(next) {
    try {
        this.options.runValidators = true;  
        let dataToUpdate = this.getUpdate().$set;
        if(dataToUpdate?.password) {
            const hashedPassword = await hashHelper.hashText(dataToUpdate?.password);
            this.setUpdate({ $set: { password: hashedPassword } });
        }
        next();
    }
    catch(error) {
        next(error);
    }
    next();
});

userSchema.statics.verifyPassword = async (hashedPassword, plainTextPassword) => {
    const authStatus = await hashHelper.compareHash(hashedPassword, plainTextPassword);
    return authStatus;
}

userSchema.methods.createJwtToken = function () {
    const { _id, name, role } = this;
    let dataToEncrypt = {
        id: _id,
        roleId: role._id,
        name: name,
    }
    return jwtHelper.createToken(dataToEncrypt);
}

const model = mongoose.model('User', userSchema);
module.exports = model;