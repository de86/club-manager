/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable('users', (table) => {
        table.uuid('id', {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
        table.string('email');
        table.string('first_name');
        table.string('second_name');
        table.string('password');
        table.string('salt');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('users');
};
