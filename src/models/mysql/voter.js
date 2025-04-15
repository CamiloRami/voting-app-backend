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

  static async getVoters () {
    const connection = await createConnection()
    try {
      const [voters] = await connection.query('SELECT * FROM voters')
      if (voters.length === 0) {
        return null
      }
      return voters
    } catch (error) {
      console.error('Error fetching voters:', error)
      throw error
    } finally {
      await connection.end()
    }
  }
}

module.exports = VoterModel
