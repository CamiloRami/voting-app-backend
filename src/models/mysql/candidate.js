const createConnection = require('../../libs/db')

class CandidateModel {
  static async getCandidates ({ offset = 0, limit = 10 } = {}) {
    const connection = await createConnection()
    try {
      const [[{ total }]] = await connection.query('SELECT COUNT(*) as total FROM voters WHERE is_candidate = 1')
      const [candidates] = await connection.query('SELECT * FROM voters WHERE is_candidate = 1 LIMIT ? OFFSET ?', [limit, offset])
      return {
        candidates: candidates.length === 0 ? null : candidates,
        pagination: {
          total,
          offset,
          limit
        }
      }
    } catch (error) {
      console.error('Error fetching candidate:', error)
      throw error
    } finally {
      await connection.end()
    }
  }

  static async getCandidateVotes ({ offset = 0, limit = 10 } = {}) {
    const connection = await createConnection()
    try {
      const [[{ total }]] = await connection.query('SELECT COUNT(*) as total FROM candidate_votes')
      const [candidates] = await connection.query('SELECT * FROM candidate_votes ORDER BY vote_count DESC LIMIT ? OFFSET ?', [limit, offset])
      return {
        candidates: candidates.length === 0 ? null : candidates,
        pagination: {
          total,
          offset,
          limit
        }
      }
    } catch (error) {
      console.error('Error fetching candidate:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = CandidateModel
