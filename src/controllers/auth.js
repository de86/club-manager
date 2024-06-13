const jwt = require('jsonwebtoken');
const {verifyPassword} = require('../utils/password');

const {httpStatus} = require('../utils/constants');
const {User} = require('../models/User');


module.exports = {
    login,
}


async function login (req, res) {
    const user = await User.getByEmail(req.body.email);
    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).send();
    }

    const isPasswordValid = await verifyPassword(req.body.password, user.data.password);
    if (!isPasswordValid) {
        return res.status(httpStatus.UNAUTHORIZED).send();
    }

    const accessToken = jwt.sign({userId: user.data.id}, process.env.JWT_SIGNING_PRIVATE_KEY);
    const refreshToken = jwt.sign({userId: user.data.id}, process.env.JWT_SIGNING_PRIVATE_KEY);

    res.status(httpStatus.OK).send({
        accessToken,
        refreshToken
    });
}