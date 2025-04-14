const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

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
