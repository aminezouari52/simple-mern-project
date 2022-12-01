const express = require('express')
const { getAllUsers, signup, signin } = require('../controllers/userController')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router
