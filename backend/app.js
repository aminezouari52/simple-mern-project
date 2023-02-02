const express = require('express')
const bodyParser = require('body-parser')

const placeRouter = require('./routes/placeRoutes')
const userRouter = require('./routes/userRoutes')
const HttpError = require('./models/http-error')

const dotenv = require('dotenv')

const app = express()

dotenv.config({ path: './config.env' })

app.use(bodyParser.json())

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next()
})

// ROUTES
app.use('/api/users', userRouter)
app.use('/api/places', placeRouter)

// Route Not Found
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404)
  throw error
})

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: err.message,
  })
  console.log('something wrong happened, shutting down...', err)
  // process.exit(1)
})

module.exports = app
