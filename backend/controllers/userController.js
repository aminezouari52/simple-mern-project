const { validationResult } = require('express-validator')
const HttpError = require('../models/http-error')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.getUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find({}, '-password')
  } catch (err) {
    return next(
      new HttpError('Fetching users failed, please try again later.', 500)
    )
  }
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  })
}

exports.signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { name, email, password } = req.body
  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again.', 500))
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    )
    return next(error)
  }

  console.log(req.body)

  const createdUser = new User({
    name,
    email,
    password,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    places: [],
  })

  try {
    await createdUser.save()
  } catch (err) {
    return next(new HttpError('Signing up save failed, please try again.', 500))
  }

  const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  })

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
  res.cookie('jwt', token, cookieOptions)

  createdUser.password = undefined
  res.status(200).json({
    status: 'success',
    token,
    data: createdUser,
  })
}

// Deactivate select: false
// const users = await User.find({ select: true }).select('+password')

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    return next(new HttpError('Please provide an email and a password', 500))

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again.', 500))
  }

  if (!existingUser || password !== existingUser.password)
    return next(
      new HttpError(
        'User not found, please verify your email and password!',
        401
      )
    )

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  })

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
  res.cookie('jwt', token, cookieOptions)

  existingUser.password = undefined

  res.status(200).json({
    status: 'success',
    token,
    data: existingUser,
  })
}

// next step : crypt the password before sending it to the database!
