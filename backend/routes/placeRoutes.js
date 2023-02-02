const express = require('express')
const { check } = require('express-validator')
const {
  getPlaceByID,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/placeController')

const router = express.Router()

router.get('/:pid', getPlaceByID)

router.get('/user/:uid', getPlacesByUserId)

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check.apply('description').isLength({ min: 5 }),
    check('adress').not().isEmpty(),
  ],
  createPlace
)

router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updatePlace
)

router.delete('/:pid', deletePlace)

module.exports = router
