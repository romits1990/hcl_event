const User = require('../models/userModel');
const Role = require('../models/roleModel');

class UserService {
    constructor() {

    }

    create(data) {
        let { name = null, email = null, password = null, role = null } = data || {};
        let newUser = new User({name: name, email: email, password: password, role: role});
        return newUser.save();
    }

    list(queryOption, sortOption, page, limit) {
        return User.find(queryOption)
                            .sort(sortOption)
                            .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
                            .limit(parseInt(limit, 10)).lean().exec();
    }

    getUserById(id) {
        return User.findById(id).lean().exec();
    }

    getNonAdminUserById(id) {
        return User.findById(id).populate({ path: 'role', match: { name: { $ne: 'admin' } } });
    }

    getUserCount(filter = {}) {
        return User.countDocuments(filter);
    }

    updateUserById(id, data) {
        let query = { _id: id };
        return User.updateOne(query, { $set: data }, { new: true });
    }

    deleteUserById(id) {
        return User.deleteOne({_id: id});
    }
}

module.exports = UserService;