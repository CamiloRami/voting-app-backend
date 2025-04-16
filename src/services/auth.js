const createConnection = require('../libs/db')
const bcrypt = require('bcrypt')

class AuthService {
  static async login ({ email, password }) {
    const connection = await createConnection()
    try {
      const [rows] = await connection.query('SELECT * FROM admins WHERE email = ?', [email])
      console.log('Rows:', rows)
      if (rows.length === 0) {
        throw new Error('Invalid email or password')
      }
      const admin = rows[0]
      const isMatch = await bcrypt.compare(password, admin.password)
      if (!isMatch) {
        throw new Error('Invalid email or password')
      }
      return admin
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = AuthService
