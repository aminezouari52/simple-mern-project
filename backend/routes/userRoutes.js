const express = require('express')
const { check } = require('express-validator')
const { getUsers, signup, login } = require('../controllers/userController')

const router = express.Router()

router.get('/', getUsers)

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
)

router.post('/login', login)

module.exports = router
