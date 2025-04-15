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

  static async createVote ({ voterId, candidateId }) {
    const connection = await createConnection()
    try {
      const [result] = await connection.query('INSERT INTO votes (candidate_id, voter_id) VALUES (?, ?)', [voterId, candidateId])
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
