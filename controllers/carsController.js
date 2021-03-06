var Car = require('../models/car')
var CarReservation = require('../models/carReservation')
var moment = require('moment')
var async = require('async')

exports.index = function (req, res, next) {
  Car.find({}, 'name model car_type')
    .limit(3)
    .exec(function (err, cars) {
      if (err) { return next(err) }
      res.render('index', {cars: cars, user: req.user})
    })
}

exports.cars_list = function (req, res, next) {
  const startDate = req.query.start_date
  const endDate = req.query.end_date
  var start = moment(startDate, 'YYYY-MM-DD')
  var end = moment(endDate, 'YYYY-MM-DD')
  const days = moment.duration(end.diff(start)).asDays()
  console.log(req.user)

  Car.find({})
    .exec(function (err, cars) {
      if (err) { return next(err) }
      res.render('cars_list', {
        cars: cars,
        startDate: startDate,
        endDate: endDate,
        days: days,
        user: req.user
      })
    })
}

exports.car_detail = function (req, res, next) {
  async.parallel({
    car: function (callback) {
      Car.findById(req.params.id)
        .exec(callback)
    },

    car_reservations: function (callback) {
      CarReservation.find({'car': req.params.id})
        .exec(callback)
    }

  }, function (err, results) {
    if (err) { return next(err) }
    if (results.car == null) {
      var error = new Error('Car not found')
      error.status = 404
      return next(err)
    }
    console.log(results.car_reservations)
    res.render('car_detail', {car: results.car, carInstances: results.car_reservations, user: req.user})
  })
}

exports.car_reservation_post = function (req, res) {
  Car.findById(req.params.id)
    .exec(function (car) {
      console.log(req.user)
      const reservation = new CarReservation(
        {
          user: req.user._id,
          car: req.params.id,
          reserved_from: req.body.start_date,
          reserved_to: req.body.end_date,
          status: 'Reserved'
        })
      reservation.save(function () {
        res.render('reservation', {reservation: reservation, user: req.user})
      })
    })
}
