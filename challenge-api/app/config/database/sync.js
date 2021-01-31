exports.async = async function() {
    const database = require('./setup');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
};