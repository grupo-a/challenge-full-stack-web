exports.up = (knex) =>
  knex.schema.createTable("students", (table) => {
    table.increments("id").primary()
    table.string("name", 255).notNullable()
    table.string("email", 255).notNullable()
    table.string("ra", 20).notNullable().unique()
    table.string("cpf", 11).notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTableIfExists("students")
