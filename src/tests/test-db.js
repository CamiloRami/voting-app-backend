const mysql = require('mysql2/promise')
const config = require('../config');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database
    })
    console.log('Connected to the database!')
    await connection.end()
  } catch (error) {
    console.error('Database connection failed:', error.message)
  }
})()
