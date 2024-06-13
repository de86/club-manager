const knex = require('knex')

const {transformObjectKeysFromSnakeToCamelCase} = require('../transforms');

const logger = require('../utils/logger');

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_DEBUG, // Move to settings when built
} = process.env; // eslint-disable-line no-undef


function initDatabase () {
    const db = knex({
        client: 'pg',
        connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        asyncStackTraces: Boolean(parseInt(DB_DEBUG)),
        },
        pool: {min: 0, max: 10},
        acquireConnectionTimeout: 30000,
        postProcessResponse: transformQueryResult,
        log: {
            error(message) {logger.error(message)},
            warn(message) {logger.warn(message)},
            deprecate(message) {logger.warn(message)},
            debug(message) {logger.debug(message)},
        },
    });

    // TODO: Find a better way to achieve this
    // Build DB library
    const dbApi = {
        users: require('./users')(db),
    }

    // Inject DB into models
    require('../models/User').inject(dbApi);
}


function transformQueryResult (result, queryContext) { // eslint-disable-line no-unused-vars
    return transformObjectKeysFromSnakeToCamelCase(result);
}


module.exports = initDatabase;