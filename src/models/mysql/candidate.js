const createConnection = require('../../libs/db')

class CandidateModel {
  static async getCandidates () {
    const connection = await createConnection()
    try {
      const [candidates] = await connection.query('SELECT * FROM voters WHERE is_candidate = 1')
      if (candidates.length === 0) {
        return null
      }
      return candidates
    } catch (error) {
      console.error('Error fetching candidate:', error)
      throw error
    } finally {
      await connection.end()
    }
  }

  static async getCandidateVotes () {
    const connection = await createConnection()
    try {
      const [candidates] = await connection.query('SELECT * FROM candidate_votes ORDER BY vote_count DESC')
      if (candidates.length === 0) {
        return null
      }
      return candidates
    } catch (error) {
      console.error('Error fetching candidate:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = CandidateModel
