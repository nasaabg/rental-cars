var CarReservation = require('../models/carReservation')

exports.my_reservations = function (req, res, next) {
  CarReservation.find({'user': req.user._id})
    .populate('car')
    .populate('user')
    .exec(function (err, reservations) {
      if (err) { return next(err) }
      res.render('my_reservations', {
        reservations: reservations,
        moment: require('moment'),
        user: req.user
      })
    })
}

exports.all_reservations = function (req, res, next) {
  CarReservation.find({user: { $ne: null }})
    .populate('car')
    .populate('user')
    .limit(20)
    .exec(function (err, reservations) {
      if (err) { return next(err) }
      res.render('all_reservations', {
        reservations: reservations,
        moment: require('moment'),
        user: req.user
      })
    })
}

exports.remove = function (req, res, next) {
  CarReservation.findByIdAndRemove(req.params.id)
    .exec(function (err, reservation) {
      if (err) { return next(err) }
      console.log(reservation)
      res.redirect(req.headers.referer)
    })
}

exports.confirm = function (req, res, next) {
  CarReservation.findByIdAndUpdate(req.params.id, {status: 'Confirmed'})
    .exec(function (err, reservation) {
      if (err) { return next(err) }
      res.redirect(req.headers.referer)
    })
}
