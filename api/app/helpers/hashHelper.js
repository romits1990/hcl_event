const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.hashText = async (plainText) => {
    return bcrypt.hash(plainText, saltRounds);
}

exports.compareHash = async (hashedText, plainText) => {
    return bcrypt.compare(plainText, hashedText);
}