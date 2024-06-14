const jwt = require('jsonwebtoken');


module.exports = {
    signJWTAsync,
    verifyJWTAsync
}


async function signJWTAsync (claims, privateKey, options) {
    return await new Promise((resolve, reject) => {
        jwt.sign(claims, privateKey, options, (err, token) => {
            if (err) reject(err);
            return resolve(token);
        });
    });
}


async function verifyJWTAsync (token, privateKey) {
    return await new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) reject(err);
            return resolve(decoded);
        });
    });
}
