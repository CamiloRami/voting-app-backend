const { getVoterSchema, createVoterSchema } = require('../schemas/voter')

class VoterController {
  constructor ({ voterModel }) {
    this.voterModel = voterModel
  }

  async getVoter (req, res) {
    const { document } = req.params
    const { error } = getVoterSchema.validate({ document })

    if (error) {
      return res.status(400).json({ error: 'Invalid document' })
    }

    try {
      const voter = await this.voterModel.getVoter({ document })
      if (!voter) {
        return res.status(404).json({ error: 'Voter not found' })
      }
      return res.json(voter)
    } catch (err) {
      console.error('Error fetching voter:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getVoters (req, res) {
    try {
      const voters = await this.voterModel.getVoters()
      if (!voters) {
        return res.status(404).json({ error: 'No voters found' })
      }
      return res.json(voters)
    } catch (err) {
      console.error('Error fetching voters:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async createVoter (req, res) {
    const {
      document,
      name,
      lastName,
      dateOfBirth,
      address,
      phone,
      sex,
      isCandidate
    } = req.body
    const { error } = createVoterSchema.validate({
      document,
      name,
      lastName,
      dateOfBirth,
      address,
      phone,
      sex,
      isCandidate
    })
    if (error) {
      return res.status(400).json({ error: 'Invalid data' })
    }
    try {
      const existingVoter = await this.voterModel.getVoter({ document })
      if (existingVoter) {
        return res.status(400).json({ error: 'Voter already exists' })
      }
      const voterId = await this.voterModel.createVoter({
        document,
        name,
        lastName,
        dateOfBirth,
        address,
        phone,
        sex,
        isCandidate
      })
      return res.status(201).json({ voterId })
    } catch (err) {
      console.error('Error creating voter:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = VoterController
