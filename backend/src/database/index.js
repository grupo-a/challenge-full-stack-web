const pg = require("pg")

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10
})

const query = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    }
    catch(err){
        return err;
    }
}

const queryFirstOrNull = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);

        if (result.rowCount > 0) {
            return result.rows[0];
        }
        
        return null;
    }
    catch(err){
        return err;
    }
}

module.exports = {
    query,
    queryFirstOrNull
}