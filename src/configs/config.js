const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  databaseuser: process.env.DATABASE_USER,
  databasepassword: process.env.DATABASE_PASSWORD,
  databasehost: process.env.DATABASE_HOST,
  databaseport: process.env.DATABASE_PORT,
  databasename: process.env.DATABASE_NAME,
  authuser: process.env.AUTH_USER,
  authpassword: process.env.AUTH_PASSWORD,
  port: process.env.PORT,
  llave: process.env.ENCRYPT_KEY
};
