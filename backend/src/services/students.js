const database = require('../database')

const findAll = async() => {
    const query = `
        SELECT * 
        FROM "Students"
    `

    return await database.query(query)
}

const findById = async(id) => {
    const query = `
        SELECT *
        FROM "Students"
        WHERE id = $1
    `;

    return await database.queryFirstOrNull(query);
}

const create = async(data) => {
    const query = `
        INSERT INTO "Students" (
            name,
            email,
            tax,
            createdAt,
            updatedAt
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;

    const values = [data.name, data.email, data.tax, 'now()', 'now()'];

    return await database.queryFirstOrNull(query, values);
}

const update = async (data) => {
    const query = `
        UPDATE "Students"
        SET
            name = $1,
            email = $2,
            tax = $3,
            updateAt = $4
        WHERE id = $5
        RETURNING *
    `;

    const values = [data.name, data.email, data.tax, 'now()', data.id];

    return await database.queryFirstOrNull(query, values);
}

const remove = async (id) => {
    const query = `
        DELETE FROM "Students"]
        WHERE id = $1
    `;

    const values = [id];

    return await database.query(query, values);
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}