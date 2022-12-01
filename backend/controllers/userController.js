const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ select: true })

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
    const user = await User.create(req.body)

    if (req.body.password !== req.body.passwordConfirm) {
      return next(new Error('password and passwordConfirm dont match!'))
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    })

    const cookieOptions = {
      maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(200).json({
      status: 'success',
      token,
      data: {
        data: user,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// Deactivate select: false
// const users = await User.find({ select: true }).select('+password')

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return next(new Error('Please provide an email and a password'))

    const user = await User.findOne({ email }).select('+password')

    if (!user || password !== user.password)
      return next(
        new Error('User not found, please verify your email and password!')
      )

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    })

    const cookieOptions = {
      maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(200).json({
      status: 'success',
      token,
      data: {
        data: user,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

// next step : crypt the password before sending it to the database!
