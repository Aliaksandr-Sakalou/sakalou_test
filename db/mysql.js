const { MYSQL_DATABASE_HOST, MYSQL_DATABASE_NAME, MYSQL_DATABASE_USER, MYSQL_DATABASE_PASSWORD } = require('../configs.js')
const mysql = require('mysql2')

let pool;

pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakaloutest'})

const promisePool = pool.promise()

promisePool.query(`CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    phone VARCHAR(20),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    PRIMARY KEY (id)
  ) AUTO_INCREMENT=1;`)

module.exports = promisePool