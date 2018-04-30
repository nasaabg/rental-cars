var Car = require('../models/car')

exports.index = function (req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page')
}

exports.car_list = function (req, res) {
  res.send('NOT IMPLEMENTED: Cars list')
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
