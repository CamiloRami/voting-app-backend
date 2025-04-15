const mysql = require('mysql2/promise')
const config = require('../../config')
const { db } = config

async function createConnection () {
  return await mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
  })
}

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
