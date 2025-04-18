const createConnection = require('../../libs/db')

class VoterModel {
  static async getVoter ({ document }) {
    const connection = await createConnection()
    try {
      const [voters] = await connection.query('SELECT * FROM voters WHERE document = ?', [document])
      if (voters.length === 0) {
        return null
      }
      return voters[0]
    } catch (error) {
      console.error('Error fetching voter:', error)
      throw error
    } finally {
      await connection.end()
    }
  }

  static async getVoters ({ offset = 0, limit = 10 } = {}) {
    const connection = await createConnection()
    try {
      const [[{ total }]] = await connection.query('SELECT COUNT(*) as total FROM voters')
      const [voters] = await connection.query('SELECT * FROM voters LIMIT ? OFFSET ?', [limit, offset])
      return {
        voters: voters.length === 0 ? null : voters,
        pagination: {
          total,
          offset,
          limit
        }
      }
    } catch (error) {
      console.error('Error fetching voters:', error)
      throw error
    } finally {
      await connection.end()
    }
  }

  static async createVoter ({ document, name, lastName, dateOfBirth, address, phone, sex, isCandidate }) {
    const connection = await createConnection()
    try {
      const [result] = await connection.query('INSERT INTO voters (document, name, last_name, date_of_birth, address, phone, sex, is_candidate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [document, name, lastName, dateOfBirth, address, phone, sex, isCandidate])
      return result.insertId
    } catch (error) {
      console.error('Error creating voter:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = VoterModel
