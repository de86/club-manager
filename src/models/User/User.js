const validate = require('validate.js');

const {createUserSchema} = require('../../validation/schema/models/userValidationSchema');

const {transformObjectKeysFromCamelToSnakeCase} = require('../../transforms');

const logger = require('../../utils/logger');

let _db;


class User {
    /**
     * Constructor - Creates a new, empty User model.
     */
    constructor () {
        if (!_db) {
            throw new Error('Unable to retrieve database conection');
        }

        return this;
    }


    /**
     * Hydrates this user object with the users data and returns self
     * @param {*} id - User ID
     */
    async get (id) {
        if (!id) {
            throw new Error('User ID is required to fetch user data');
        }

        const userRecord = await _db.users.getById(id);
        if (!userRecord) {
            throw new Error(`User with id ${id} not found`);
        }

        this.data = userRecord;

        return this;
    }


    async create (userData) {
        const validationFailures = validate(userData, createUserSchema);
        if (validationFailures) {
            const errorMessage = 'userData object failed validation';
            logger.error(errorMessage, validationFailures);

            throw new Error(errorMessage);
        }

        const transformedUserData = transformObjectKeysFromCamelToSnakeCase(userData);

        const [userRecord] = await _db.users.createUser(transformedUserData);

        this.data = userRecord;

        return this;
    }
}


module.exports = {
    inject: (db) => {if (!_db) _db = db},
    User,
};
