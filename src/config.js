require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  whitelist: ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:3001'],
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.TOKEN_EXPIRATION || '1h'
  }
}

module.exports = config
