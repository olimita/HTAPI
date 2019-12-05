const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  databasepassword: process.env.DATABASE_PASSWORD,
  authuser: process.env.AUTH_USER,
  authpassword: process.env.AUTH_PASSWORD,
  port: process.env.PORT,
  llave: process.env.ENCRYPT_KEY
};
