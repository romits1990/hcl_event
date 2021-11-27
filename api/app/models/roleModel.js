const mongoose = require('mongoose');
const { Schema } = mongoose;
const roleSchema = new Schema(
    {
        displayName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            validate: [
                {
                    validator: async (value) => {
                        let existingRole = await mongoose.model('Role').findOne({name: value});
                        return existingRole===null;
                    },
                    message: props => `Role ${props.value} already exists.`
                }
            ]
        }
    },
    {
        timestamps: true
    }
);
const roleModel = mongoose.model('Role', roleSchema);
module.exports = roleModel;