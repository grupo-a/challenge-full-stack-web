exports.seed = (knex) =>
  knex("students")
    .del()
    .then(() =>
      knex("students").insert([
        { name: "Rafael Henrique", email: "rafael@example.com", ra: "102030", cpf: "11111111111" },
        { name: "Stephanne Bento", email: "stephanne@example.com", ra: "203040", cpf: "22222222222" },
        { name: "Rita de Cassia", email: "rita@example.com", ra: "213150", cpf: "33333333333" },
      ]),
    )
