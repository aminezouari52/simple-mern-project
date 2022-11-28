const express = require('express')

const router = express.Router()
const { default: mongoose } = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: String,
})

const Product = mongoose.model('Product', ProductSchema)

router.route('/').get(() => async (req, res, next) => {
  try {
    const product = await Product.find()

    res.status(200).json({
      message: 'hi im testing this endpoint and it turns out its working!',
      product,
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
