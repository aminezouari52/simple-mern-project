const express = require('express')
const {
  getPlace,
  getUserPlaces,
  createPlace,
} = require('../controllers/placeController')

const router = express.Router()

router.get('/:pid', getPlace)
router.get('/user/:uid', getUserPlaces)

router.post('/', createPlace)

module.exports = router
