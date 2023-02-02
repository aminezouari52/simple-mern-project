const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Place = require('../models/place')
const User = require('../models/user')

exports.getPlaceByID = async (req, res, next) => {
  let places
  try {
    places = await Place.findById(req.params.pid)
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find a place', 500)
    )
  }
  if (!places) {
    const error = new HttpError(
      'Could not find a place for the provided id.',
      404
    )
    return next(error)
  }
  res.status(200).json({
    status: 'success',
    data: places,
  })
}

exports.getPlacesByUserId = async (req, res, next) => {
  let userWithPlaces
  try {
    userWithPlaces = await User.findById(req.params.uid).populate('places')
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later',
      500
    )
    return next(error)
  }

  // if (!places || places.length === 0) {
  // if (!userWithPlaces || userWithPlaces.places.length === 0) {
  //   return next(
  //     new HttpError('Could not find places for the provided user id.', 404)
  //   )
  // }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  })
}

exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    )
  }

  const { title, description, address, creator } = req.body

  const createdPlace = new Place({
    title,
    description,
    address,
    location: { lat: 1, lng: 2 },
    image: 'test1',
    creator,
  })

  let user
  try {
    user = await User.findById(creator)
  } catch (err) {
    const error = new HttpError('Could not find creator', 500)
    return next(error)
  }

  if (!user) {
    return next(new HttpError('could not find user for provided id', 404))
  }

  console.log(user)

  try {
    await createdPlace.save()
    user.places.push(createdPlace)
    await user.save()
  } catch (err) {
    console.log(err)
    const error = new HttpError('Creating place failed, please try again', 500)
    return next(error)
  }
  res.status(201).json({
    status: 'success',
    data: createdPlace,
  })
}

exports.updatePlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description } = req.body
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    )
    return next(error)
  }

  place.title = title
  place.description = description

  try {
    await place.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    )
    return next(error)
  }

  res.status(200).json({ place: place.toObject({ getters: true }) })
}

exports.deletePlace = async (req, res, next) => {
  let place
  try {
    place = await Place.findByIdAndDelete(req.params.pid)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    )
    return next(error)
  }

  if (!place) {
    const error = new HttpError('Could not find place for this id.', 404)
    return next(error)
  }

  res.status(200).json({ message: 'Deleted place.' })
}
