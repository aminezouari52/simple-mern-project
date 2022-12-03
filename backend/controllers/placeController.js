const User = require('../models/User')

exports.getUserPlaces = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.uid })

    res.status(200).json({
      status: 'success',
      data: user.places,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getPlace = async (req, res, next) => {
  try {
    const results = await User.findOne({
      'places._id': req.params.pid,
    })

    res.status(200).json({
      status: 'success',
      data: results.places,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.createPlace = async (req, res, next) => {
  try {
  } catch (err) {}
}
