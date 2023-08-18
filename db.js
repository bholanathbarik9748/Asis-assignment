const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Asis',
    password: 'Asis@123',
    database: 'Asis',
    connectionLimit: 10,
});

module.exports = pool;