var express = require('express')
var router = express.Router()

// Require controller modules.
var carsController = require('../controllers/carsController')

// GET catalog home page.
router.get('/', carsController.index)

// POST request for creating Car.
router.post('/cars', carsController.car_create_post)

// POST request to delete Car.
router.post('/cars/:id/delete', carsController.car_delete_post)

// POST request to update Car.
router.post('/cars/:id/update', carsController.car_update_post)

// GET request for one Car.
router.get('/cars/:id', carsController.car_detail)

// GET request for list of all Car items.
router.get('/cars', carsController.car_list)

module.exports = router
