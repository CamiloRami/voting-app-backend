const express = require('express')
const createVoterRouter = require('./voters')
const createCandidateRouter = require('./candidates')

function createRouter ({ voterModel, candidateModel }) {
  const router = express.Router()
  const voterRouter = createVoterRouter({ voterModel })
  const candidateRouter = createCandidateRouter({ candidateModel })

  router.use('/voters', voterRouter)
  router.use('/candidates', candidateRouter)

  return router
}
module.exports = createRouter
