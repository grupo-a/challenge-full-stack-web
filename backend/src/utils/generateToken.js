const jwt = require('jsonwebtoken');
require('dotenv').config();

async function generateToken(payload) {
 

  const token = await jwt.sign(
    { id: 1, name: 'Dev Tester' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIME }
  );
console.log(token)

}

generateToken()




module.exports = generateToken;