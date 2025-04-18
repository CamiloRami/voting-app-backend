const createConnection = require('../../libs/db')

class VoteModel {
  static async getVotes ({ offset = 0, limit = 10 } = {}) {
    const connection = await createConnection()
    try {
      const [[{ total }]] = await connection.query('SELECT COUNT(*) as total FROM votes')
      const [votes] = await connection.query('SELECT * FROM votes LIMIT ? OFFSET ?', [limit, offset])
      return {
        votes: votes.length === 0 ? null : votes,
        pagination: {
          total,
          offset,
          limit
        }
      }
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

  static async getDetailedVotes ({ offset = 0, limit = 10 } = {}) {
    const connection = await createConnection()
    try {
      const [[{ total }]] = await connection.query('SELECT COUNT(*) as total FROM detailed_votes')
      const [votes] = await connection.query('SELECT * FROM detailed_votes LIMIT ? OFFSET ?', [limit, offset])
      return {
        votes: votes.length === 0 ? null : votes,
        pagination: {
          total,
          offset,
          limit
        }
      }
    } catch (error) {
      console.error('Error fetching detailed votes:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}
module.exports = VoteModel
