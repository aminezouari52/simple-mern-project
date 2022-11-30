const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        data: users,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.password,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    })

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() * process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })

    // user.password = undefined

    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
