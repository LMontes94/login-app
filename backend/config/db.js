// config/db.js
require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_NAME_PROD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
