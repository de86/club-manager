const {httpStatus} = require('../utils/constants');


module.exports = {
    login,
}


async function login (req, res) {
    res.status(httpStatus.OK).send('ok');
}