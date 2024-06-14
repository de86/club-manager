const {User} = require('../models/User');
const {httpStatus} = require('../utils/constants');
const logger = require('../utils/logger');
const passwordUtils = require('../utils/password');


module.exports = {
    getUser,
    createUser,
}


async function getUser (req, res) {
    try{ 
        const user = await User.getById(req.params.id);

        res.status(httpStatus.OK).send({
            id: user.data.id,
            email: user.data.email,
            firstName: user.data.firstName,
            surname: user.data.surname,
        });
    } catch (e) {
        logger.error(`Unable to retrieve user ${req.params.id}.`, e);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


async function createUser (req, res) {
    try {
        const {hash, salt} = await passwordUtils.generateHash(req.body.password);

        const user = new User();
        await user.create({
            firstName: req.body.firstName,
            surname: req.body.surname,
            email: req.body.email,
            password: hash,
            salt: salt,
        });

        res.status(httpStatus.OK).send({id: user.data.id});
    } catch (e) {
        logger.error('Unable to create user', e);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
