const createConnection = require('../libs/db')
const bcrypt = require('bcrypt')

class AuthService {
  static async login ({ email, password }) {
    const connection = await createConnection()
    try {
      const [rows] = await connection.query('SELECT * FROM admins WHERE email = ?', [email])
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

  static async logout (req, res) {
    try {
      res.clearCookie('token')
      res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
      console.error('Error logging out:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async changePassword ({ email, oldPassword, newPassword }) {
    const connection = await createConnection()
    try {
      const [rows] = await connection.query('SELECT * FROM admins WHERE email = ?', [email])
      if (rows.length === 0) {
        throw new Error('Admin not found')
      }
      const admin = rows[0]
      const isMatch = await bcrypt.compare(oldPassword, admin.password)
      if (!isMatch) {
        throw new Error('Old password is incorrect')
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await connection.query('UPDATE admins SET password = ? WHERE email = ?', [hashedPassword, email])
      return { message: 'Password updated successfully' }
    } catch (error) {
      console.error('Error changing password:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = AuthService
