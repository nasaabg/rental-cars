var express = require('express')
var router = express.Router()
var controller = require('../controllers/reservationsController.js')

// restrict index for logged in user only
router.get('/my_reservations', controller.my_reservations)
router.get('/all_reservations', controller.all_reservations)

router.post('/reservations/:id/remove', controller.remove)
router.post('/reservations/:id/confirm', controller.confirm)

module.exports = router
