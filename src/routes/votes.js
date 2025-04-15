const express = require('express')
const VoteController = require('../controllers/vote')

function createVoteRouter ({ voteModel }) {
  const router = express.Router()
  const voteController = new VoteController({ voteModel })

  router.get('/', (req, res) => {
    return voteController.getVotes(req, res)
  })

  router.post('/', (req, res) => {
    return voteController.createVote(req, res)
  })

  return router
}
module.exports = createVoteRouter
