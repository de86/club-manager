const validate = require('validate.js');

const {httpStatus} = require('../utils/constants');
const logger = require('../utils/logger');


module.exports = validateRequest;


function validateRequest ({headerValidationSchema, paramsValidationSchema, bodyValidationSchema}) {
    return (req, res, next) => {
        if (
            !isObjectValid(req.headers, headerValidationSchema)
            || !isObjectValid(req.params, paramsValidationSchema)
            || !isObjectValid(req.body, bodyValidationSchema)
        ) {
            return res.status(httpStatus.BAD_REQUEST).send({message: 'Request validation failed'});
        }

        return next();
    }
}


function isObjectValid (objToValidate, schema) { // Can be memoized
    let wasValidationSuccessful = true;
    if (schema) {
        const failReasons = validate(objToValidate, schema);
        if (failReasons) {
            wasValidationSuccessful = false;
            logger.info('Request validation failed', failReasons);
        }
    }

    return wasValidationSuccessful;
}


