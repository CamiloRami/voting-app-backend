class CandidateController {
  constructor ({ candidateModel }) {
    this.candidateModel = candidateModel
  }

  async getCandidates (req, res) {
    try {
      const candidates = await this.candidateModel.getCandidates()
      if (!candidates) {
        return res.status(404).json({ error: 'No candidates found' })
      }
      return res.json(candidates)
    } catch (err) {
      console.error('Error fetching candidates:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = CandidateController
