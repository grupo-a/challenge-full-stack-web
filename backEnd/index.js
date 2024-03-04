require( "dotenv" ).config();

const express 			= require( "express" );
const helmet 			= require( "helmet" );
const logger 			= require( "morgan" );

const cors				= require( "cors" );
const routes            = require( "./src/routes/index" );
const app 				= express();

const port 			    = process.env.PORT || 8080;

app.use( helmet() );
app.use( logger( "dev" ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cors() );
app.use( routes );

app.listen( port, () => console.log( `Listening on port ${port}!` ) );