const express = require('express')
const createVoterRouter = require('./voters')

function createRouter ({ voterModel }) {
  const router = express.Router()
  const voterRouter = createVoterRouter({ voterModel })

  router.use('/voters', voterRouter)

  return router
}
module.exports = createRouter
