const express = require('express')
const VoterController = require('../controllers/voter')

function createVoterRouter ({ voterModel }) {
  const router = express.Router()
  const voterController = new VoterController({ voterModel })

  router.get('/:document', (req, res) => {
    return voterController.getVoter(req, res)
  })

  return router
}

module.exports = createVoterRouter
