const sql = require('sql-query')
sqlQuery = sql.Query('mysql');

const insertSQL = (table, objectFields) => {

    const sqlInsert = sqlQuery.insert();

    return sqlInsert.into(table).set(objectFields).build();

}

const updateSQL = (table, objectFields, where) => {

    const sqlUpdate = sqlQuery.update();

    return sqlUpdate
        .into(table)
        .set(objectFields)
        .where(where)
        .build();

}

module.exports = {
    insertSQL,
    updateSQL
}