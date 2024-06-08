require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_MIGRATIONS_PATH,
} = process.env // eslint-disable-line no-undef

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    migrations: {
      directory: DB_MIGRATIONS_PATH,
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    migrations: {
      directory: DB_MIGRATIONS_PATH,
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    migrations: {
      directory: DB_MIGRATIONS_PATH,
    },
  },
};
