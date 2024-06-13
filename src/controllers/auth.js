const jwt = require('jsonwebtoken');

const {httpStatus} = require('../utils/constants');
const {User} = require('../models/User');


module.exports = {
    login,
}


async function login (req, res) {
    const isExistingUser = await User.doesUserExistForEmail(req.body.email);
    if (!isExistingUser) {
        res.status(httpStatus.UNAUTHORIZED).send();
    }

    res.status(httpStatus.OK).send('ok');
}