const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const createRouter = require('./routes')
const cookieParser = require('cookie-parser')
const config = require('./config')
const VoterModel = require('./models/mysql/voter')
const CandidateModel = require('./models/mysql/candidate')
const VoteModel = require('./models/mysql/vote')
const AuthService = require('./services/auth')

require('dotenv').config()
const { port, whitelist } = config
const app = express()
const PORT = port

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// Middlewares
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', createRouter({
  voterModel: VoterModel,
  candidateModel: CandidateModel,
  voteModel: VoteModel,
  authService: AuthService
}))

app.get('/', (req, res) => {
  res.json({ message: 'Voting API' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})

module.exports = app
