const jwt = require('jsonwebtoken')
const config = require('../config')

function authMiddleware (req, res, next) {
  console.log('authMiddleware')
  console.log(req.cookies)
  // console.log(req.headers)
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  req.session = { admin: null }

  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    req.session.admin = decoded
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}

module.exports = authMiddleware
