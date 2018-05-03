#! /usr/bin/env node

console.log('This script populates cars and carinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url')

// Get arguments passed on command line
var userArgs = process.argv.slice(2)
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument')
}

var async = require('async')
var Car = require('./models/car')
var CarType = require('./models/cartype')
var CarReservation = require('./models/carReservation')

var mongoose = require('mongoose')
var mongoDB = userArgs[0]
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

var cars = []
var carReservations = []
var carTypes = []

function carCreate (name, model, priceDay, carType, vinNumber, description, cb) {
  const cardetail = {
    name: name,
    model: model,
    price_day: priceDay,
    car_type: carType,
    vin_number: vinNumber,
    description: description
  }

  var car = new Car(cardetail)
  car.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Car: ' + car)
    cars.push(car)
    cb(null, car)
  })
}

function carTypeCreate (name, description, cb) {
  var carType = new CarType({ name: name, description: description })

  carType.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Car Type: ' + carType)
    carTypes.push(carType)
    cb(null, carType)
  })
}

function carReservationCreate (car, status, days, reservedFrom, reservedTo, cb) {
  const reservationDetails = {
    car: car,
    status: status,
    days: days,
    reserved_from: reservedFrom,
    reserved_to: reservedTo
  }

  var carReservation = new CarReservation(reservationDetails)
  carReservation.save(function (err) {
    if (err) {
      console.log('ERROR CREATING CarReservation: ' + carReservation)
      cb(err, null)
      return
    }
    console.log('New CarInstance: ' + carReservation)
    carReservations.push(carReservation)
    cb(null, car)
  })
}

function createCarTypes (cb) {
  async.parallel([
    function (callback) {
      carTypeCreate('Sedan', '', callback)
    },
    function (callback) {
      carTypeCreate('Van', '', callback)
    },
    function (callback) {
      carTypeCreate('Suv', '', callback)
    },
    function (callback) {
      carTypeCreate('Compact', '', callback)
    }
  ],
    // optional callback
  cb)
}

function createCars (cb) {
  async.parallel([
    function (callback) {
      carCreate('Skoda', 'Fabia', 40, [carTypes[0]], '3312213231', '', callback)
    },
    function (callback) {
      carCreate('Skoda', 'Octavia', 80, [carTypes[0]], '232231123', '', callback)
    },
    function (callback) {
      carCreate('Skoda', 'Superb', 100, [carTypes[1]], '5243232', '', callback)
    },
    function (callback) {
      carCreate('BMW', 'X1', 200, [carTypes[2]], '234142', '', callback)
    }
  ],
    // optional callback
  cb)
}

function createCarReservations (cb) {
  async.parallel([
    function (callback) {
      carReservationCreate(cars[0], 'Reserved', 9, '2018-05-01', '2018-05-10', callback)
    },
    function (callback) {
      carReservationCreate(cars[1], 'Reserved', 9, '2018-05-01', '2018-05-10', callback)
    },
    function (callback) {
      carReservationCreate(cars[2], 'Reserved', 9, '2018-05-01', '2018-05-10', callback)
    },
    function (callback) {
      carReservationCreate(cars[3], 'Reserved', 9, '2018-05-01', '2018-05-10', callback)
    },
    function (callback) {
      carReservationCreate(cars[3], 'Reserved', 9, '2018-05-01', '2018-05-10', callback)
    },
    function (callback) {
      carReservationCreate(cars[3], 'Reserved', 9, '2018-05-01', '2018-05-10', callback)
    }
  ],
  cb)
}

async.series([
  createCarTypes,
  createCars,
  createCarReservations,
],
// Optional callback
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('reservations: ' + carReservations)
  }
  // All done, disconnect from database
  mongoose.connection.close()
})
