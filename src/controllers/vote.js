const { createVoteSchema } = require('../schemas/vote')

class VoteController {
  constructor ({ voteModel }) {
    this.voteModel = voteModel
  }

  async getVotes (req, res) {
    try {
      const offset = parseInt(req.query.offset) || 0
      const limit = parseInt(req.query.limit) || 10

      const result = await this.voteModel.getVotes({ offset, limit })
      if (!result.votes) {
        return res.status(404).json({ error: 'No votes found' })
      }
      return res.json(result)
    } catch (err) {
      console.error('Error fetching votes:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async createVote (req, res) {
    const { voterId, candidateId } = req.body
    const { error } = createVoteSchema.validate({ voterId, candidateId })
    if (error) {
      return res.status(400).json({ error: 'Invalid data' })
    }
    try {
      const voteId = await this.voteModel.createVote({ voterId, candidateId })
      return res.status(201).json({ voteId })
    } catch (err) {
      console.error('Error creating vote:', err)
      if (err.message === 'Voter has already voted') {
        return res.status(400).json({ error: 'Voter has already voted' })
      }
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getDetailedVotes (req, res) {
    try {
      const offset = parseInt(req.query.offset) || 0
      const limit = parseInt(req.query.limit) || 10

      const result = await this.voteModel.getDetailedVotes({ offset, limit })
      if (!result.votes) {
        return res.status(404).json({ error: 'No detailed votes found' })
      }
      return res.json(result)
    } catch (err) {
      console.error('Error fetching detailed votes:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
module.exports = VoteController
