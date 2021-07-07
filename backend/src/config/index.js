// configura o arquivo env a ser utilizado de acordo com o parâmetro NODE_ENV
require('dotenv').config({
    path: process.env.NODE_ENV == 'production' ? '.env.prod' : ".env"
});