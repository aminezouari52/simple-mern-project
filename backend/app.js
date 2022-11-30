const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')
const { default: mongoose } = require('mongoose')

const userRouter = require('./routes/userRoutes')

const dotenv = require('dotenv')

const app = express()

app.use(dotenv.config())

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

// app.post('/product', (req, res, next) => {
//   const { title, price } = req.body

//   if (!title || title.trim().length === 0 || !price || price <= 0) {
//     return res.status(422).json({
//       message: 'Invalid input, please enter a valid title and price.',
//     })
//   }

//   const createdProduct = {
//     id: uuid(),
//     title,
//     price,
//   }

//   DUMMY_PRODUCTS.push(createdProduct)

//   res
//     .status(201)
//     .json({ message: 'Created new product.', product: createdProduct })
// })

module.exports = app
