const jsonWebToken = require("jsonwebtoken");
const fs = require("fs");

const JWT_PRIVATE_KEY = fs.readFileSync("./app/rsa_keys/private.key", "utf8");
const JWT_PUBLIC_KEY = fs.readFileSync("./app/rsa_keys/public.key", "utf8");
const JWT_CONFIG = require('../configurations/jwt.config').config;
const { ISSUER, EXPIRATION, ALGORITHM, SUBJECT, AUDIENCE } = JWT_CONFIG;

exports.createToken = (payload) => {
    let signOptions = {
     issuer: ISSUER,
     subject: SUBJECT,
     audience: AUDIENCE,
     expiresIn: EXPIRATION,
     algorithm: ALGORITHM
    };
    return jsonWebToken.sign(payload, JWT_PRIVATE_KEY, signOptions);
}

exports.verifyAndDecode = (token) => {
    let verifyOptions = {
     issuer: ISSUER,
     subject: SUBJECT,
     audience: AUDIENCE,
     expiresIn: EXPIRATION,
     algorithm: [ALGORITHM]
    };
    try {
        return jsonWebToken.verify(token, JWT_PUBLIC_KEY, verifyOptions);
    }
    catch(error) {
        return false;
    }
}

// decode without verifying signature
exports.decode = (token) => {
    return jsonWebToken.decode(token, {complete: true});
}