const express = require('express')
const CandidateController = require('../controllers/candidate')

function createCandidateRouter ({ candidateModel }) {
  const router = express.Router()
  const candidateController = new CandidateController({ candidateModel })

  router.get('/', (req, res) => {
    return candidateController.getCandidates(req, res)
  })

  return router
}
module.exports = createCandidateRouter
