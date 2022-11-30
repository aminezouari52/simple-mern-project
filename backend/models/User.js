const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please enter an email'],
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please enter a password'],
  },
  name: String,
  age: {
    type: Number,
    min: 0,
    max: 99,
  },
  places: [
    {
      title: String,
      description: String,
    },
  ],
})

const User = mongoose.model('User', UserSchema)

module.exports = User
