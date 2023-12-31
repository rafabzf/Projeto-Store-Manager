const MYSQL = require('mysql2/promise');

const connection = MYSQL.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;