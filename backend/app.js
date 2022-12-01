const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')
const { default: mongoose } = require('mongoose')

const userRouter = require('./routes/userRoutes')

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

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: err.message,
  })
  console.log('something wrong happened, shutting down...')
  // process.exit(1)
})

module.exports = app
