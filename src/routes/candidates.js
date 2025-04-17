const express = require('express')
const CandidateController = require('../controllers/candidate')
const authMiddleware = require('../middlewares/auth')

function createCandidateRouter ({ candidateModel }) {
  const router = express.Router()
  const candidateController = new CandidateController({ candidateModel })

  router.get('/', (req, res) => {
    return candidateController.getCandidates(req, res)
  })

  router.get('/votes', authMiddleware, (req, res) => {
    return candidateController.getCandidateVotes(req, res)
  })

  return router
}
module.exports = createCandidateRouter
