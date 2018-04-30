var Car = require('../models/car')

var async = require('async')

exports.index = function (req, res) {
  async.parallel({
    carsCount: function (callback) {
      Car.count({}, callback)
    }
  }, function (err, results) {
    res.render('index', { title: 'Car rental Home', error: err, data: results })
  })
}

exports.cars_list = function (req, res, next) {
  Car.find({}, 'name model car_type')
    .exec(function (err, carsList) {
      if (err) { return next(err) }
      res.render('cars_list', { title: 'Cars List', carsList: carsList })
    })
}

exports.car_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id)
}

exports.car_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create POST')
}

exports.car_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST')
}

exports.car_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST')
}
