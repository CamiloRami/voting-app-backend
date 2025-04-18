class CandidateController {
  constructor ({ candidateModel }) {
    this.candidateModel = candidateModel
  }

  async getCandidates (req, res) {
    try {
      const offset = parseInt(req.query.offset) || 0
      const limit = parseInt(req.query.limit) || 10

      const result = await this.candidateModel.getCandidates({ offset, limit })
      if (!result.candidates) {
        return res.status(404).json({ error: 'No candidates found' })
      }
      return res.json(result)
    } catch (err) {
      console.error('Error fetching candidates:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getCandidateVotes (req, res) {
    try {
      const offset = parseInt(req.query.offset) || 0
      const limit = parseInt(req.query.limit) || 10

      const result = await this.candidateModel.getCandidateVotes({ offset, limit })
      if (!result.candidates) {
        return res.status(404).json({ error: 'No candidates found' })
      }
      return res.json(result)
    } catch (err) {
      console.error('Error fetching candidate votes:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = CandidateController
