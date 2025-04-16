const express = require('express')
const AuthController = require('../controllers/auth')

const createAuthRouter = ({ authService }) => {
  const router = express.Router()
  const authController = new AuthController({ authService })

  router.post('/login', async (req, res) => {
    return authController.login(req, res)
  })

  router.post('/logout', async (req, res) => {
    return authController.logout(req, res)
  })

  return router
}

module.exports = createAuthRouter
