const createConnection = require('../../libs/db')

class VoterModel {
  static async getVoter ({ document }) {
    const connection = await createConnection()
    try {
      const [voter] = await connection.query('SELECT * FROM voters WHERE document = ?', [document])
      if (voter.length === 0) {
        return null
      }
      return voter[0]
    } catch (error) {
      console.error('Error fetching voter:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = VoterModel
