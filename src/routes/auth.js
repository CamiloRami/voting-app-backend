const express = require('express')
const AuthController = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')

const createAuthRouter = ({ authService }) => {
  const router = express.Router()
  const authController = new AuthController({ authService })

  router.post('/login', async (req, res) => {
    return authController.login(req, res)
  })

  router.post('/logout', authMiddleware, async (req, res) => {
    return authController.logout(req, res)
  })

  router.post('/change-password', authMiddleware, async (req, res) => {
    return authController.changePassword(req, res)
  })

  router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Authenticated' })
  })

  return router
}

module.exports = createAuthRouter
