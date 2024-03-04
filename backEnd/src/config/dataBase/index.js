require( "dotenv" ).config();

const { Pool } = require( "pg" );

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_WRITE_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 10000,
};
const client = new Pool( config );

client.connect().catch( ( error ) => {
    console.log(
        `Não foi possível realizar a conexão com o banco de dados! ${ error }`
    );
} );

module.exports = {
    query: ( text, params ) => client.query( text, params ),
};
