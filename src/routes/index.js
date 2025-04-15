const express = require('express')
const createVoterRouter = require('./voters')
const createCandidateRouter = require('./candidates')
const createVoteRouter = require('./votes')

function createRouter ({ voterModel, candidateModel, voteModel }) {
  const router = express.Router()
  const voterRouter = createVoterRouter({ voterModel })
  const candidateRouter = createCandidateRouter({ candidateModel })
  const voteRouter = createVoteRouter({ voteModel })

  router.use('/voters', voterRouter)
  router.use('/candidates', candidateRouter)
  router.use('/votes', voteRouter)

  return router
}
module.exports = createRouter
