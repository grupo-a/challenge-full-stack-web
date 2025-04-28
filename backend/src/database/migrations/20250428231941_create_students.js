exports.up = function(knex) {
    return knex.schema.createTable('students', function(table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('ra', 20).notNullable().unique();
        table.string('cpf', 11).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('students');
};
