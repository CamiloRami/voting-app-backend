const jwt = require('jsonwebtoken')
const config = require('../config')

class AuthController {
  constructor ({ authService }) {
    this.authService = authService
  }

  async login (req, res) {
    try {
      const { email, password } = req.body
      const admin = await this.authService.login({ email, password })
      const token = jwt.sign({
        id: admin.id,
        email: admin.email,
        name: admin.name
      }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
      })
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
      })
      res.status(200).json({
        name: admin.name,
        last_name: admin.last_name,
        email: admin.email
      }, token)
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  }

  async logout (req, res) {
    try {
      await this.authService.logout(req, res)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async changePassword (req, res) {
    try {
      const { oldPassword, newPassword } = req.body
      const email = req.session.admin.email
      const result = await this.authService.changePassword({ email, oldPassword, newPassword })
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = AuthController
