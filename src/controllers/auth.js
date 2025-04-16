const jwt = require('jsonwebtoken')
const config = require('../config')
// const bcrypt = require('bcrypt')

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
      res.status(200).send(admin, token)
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  async logout (req, res) {
    try {
      await this.authService.logout(req, res)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = AuthController
