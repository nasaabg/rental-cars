var express = require('express')
var router = express.Router()

// Require controller modules.
var carsController = require('../controllers/carsController')

// GET catalog home page.
router.get('/', carsController.index)

router.post('/cars/:id/reservation', carsController.car_reservation_post)

// GET request for one Car.
router.get('/cars/:id', carsController.car_detail)

// GET request for list of all Car items.
router.get('/cars', carsController.cars_list)

module.exports = router
