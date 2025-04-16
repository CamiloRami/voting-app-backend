const express = require('express')
const createVoterRouter = require('./voters')
const createCandidateRouter = require('./candidates')
const createVoteRouter = require('./votes')
const createAuthRouter = require('./auth')

function createRouter ({ voterModel, candidateModel, voteModel, authService }) {
  const router = express.Router()
  const voterRouter = createVoterRouter({ voterModel })
  const candidateRouter = createCandidateRouter({ candidateModel })
  const voteRouter = createVoteRouter({ voteModel })
  const authRouter = createAuthRouter({ authService })

  router.use('/voters', voterRouter)
  router.use('/candidates', candidateRouter)
  router.use('/votes', voteRouter)
  router.use('/auth', authRouter)

  return router
}
module.exports = createRouter
