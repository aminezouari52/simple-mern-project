const express = require('express')
const {
  getPlace,
  getUserPlaces,
  createPlace,
  deletePlace,
} = require('../controllers/placeController')

const router = express.Router()

router.get('/:pid', getPlace)
router.get('/user/:uid', getUserPlaces)

router.post('/', createPlace)

// router.delete('/:pid', deletePlace)

module.exports = router
