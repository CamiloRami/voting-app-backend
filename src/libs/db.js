const mysql = require('mysql2/promise')
const config = require('../config')
const { db } = config

async function createConnection () {
  return await mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
  })
}

module.exports = createConnection
