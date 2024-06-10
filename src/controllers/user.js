const logger = require('../utils/logger');
const {httpStatus} = require('../utils/constants');
const {User} = require('../models/User');


async function getUser (req, res) {
    try{
        const user = new User();
        await user.get(req.params.id);
    
        res.status(httpStatus.OK).send(user.data);
    } catch (e) {
        logger.error(`Unable to retrieve user ${req.params.id}.`, e);

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
}


function createUser (req, res) {
    logger.info('User created', req.body);

    res.status(httpStatus.OK).send({succes: true});
}


module.exports = {
    getUser,
    createUser,
}