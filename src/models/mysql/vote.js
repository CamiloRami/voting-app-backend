const createConnection = require('../../libs/db')

class VoteModel {
  static async getVotes () {
    const connection = await createConnection()
    try {
      const [votes] = await connection.query('SELECT * FROM votes')
      if (votes.length === 0) {
        return null
      }
      return votes
    } catch (error) {
      console.error('Error fetching votes:', error)
      throw error
    } finally {
      await connection.end()
    }
  }

  static async getVoteByVoterId ({ voterId }) {
    const connection = await createConnection()
    try {
      const [votes] = await connection.query('SELECT * FROM votes WHERE voter_id = ?', [voterId])
      if (votes.length === 0) {
        return null
      }
      return votes
    } catch (error) {
      console.error('Error fetching vote by voter ID:', error)
      throw error
    } finally {
      await connection.end()
    }
  }

  static async createVote ({ voterId, candidateId }) {
    const connection = await createConnection()
    try {
      const hasVoted = await this.getVoteByVoterId({ voterId }).then(Boolean)
      if (hasVoted) {
        throw new Error('Voter has already voted')
      }

      const [result] = await connection.query('INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)', [voterId, candidateId])
      return result.insertId
    } catch (error) {
      console.error('Error creating vote:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}
module.exports = VoteModel
