const express = require('express')
const VoterController = require('../controllers/voter')
const authMiddleware = require('../middlewares/auth')

function createVoterRouter ({ voterModel }) {
  const router = express.Router()
  const voterController = new VoterController({ voterModel })

  router.get('/', (req, res) => {
    return voterController.getVoters(req, res)
  })

  router.get('/:document', (req, res) => {
    return voterController.getVoter(req, res)
  })

  router.post('/', authMiddleware, (req, res) => {
    return voterController.createVoter(req, res)
  })

  return router
}

module.exports = createVoterRouter
