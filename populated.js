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
var CarInstance = require('./models/carinstance')

var mongoose = require('mongoose')
var mongoDB = userArgs[0]
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

var cars = []
var carinstances = []
var cartypes = []

function carCreate (name, model, car_type, description, cb) {
  const cardetail = {
    name: name,
    model: model,
    car_type: car_type,
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
    cartypes.push(carType)
    cb(null, carType)
  })
}

function carInstanceCreate (car, status, due_back, price_day, vin_number, cb) {
  const carinstancedetail = {
    car: car,
    price_day: price_day,
    vin_number: vin_number
  }
  if (due_back != false) carinstancedetail.due_back = due_back
  if (status != false) carinstancedetail.status = status

  var carinstance = new CarInstance(carinstancedetail)
  carinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING CarInstance: ' + carinstance)
      cb(err, null)
      return
    }
    console.log('New CarInstance: ' + carinstance)
    carinstances.push(carinstance)
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
      carCreate('Skoda', 'Fabia', [cartypes[0]], '', callback)
    },
    function (callback) {
      carCreate('Skoda', 'Octavia', [cartypes[0]], '', callback)
    },
    function (callback) {
      carCreate('Skoda', 'Superb', [cartypes[1]], '', callback)
    },
    function (callback) {
      carCreate('BMW', 'X1', [cartypes[2]], '', callback)
    }
  ],
    // optional callback
  cb)
}

function createCarInstances (cb) {
  async.parallel([
    function (callback) {
      carInstanceCreate(cars[0], 'Available', false, 20.5, '423314423', callback)
    },
    function (callback) {
      carInstanceCreate(cars[1], 'Available', false, 40.0, '2433434', callback)
    },
    function (callback) {
      carInstanceCreate(cars[2], 'Available', false, 40.0, '1323123', callback)
    },
    function (callback) {
      carInstanceCreate(cars[3], 'Available', false, 50.0, '54312', callback)
    },
    function (callback) {
      carInstanceCreate(cars[3], 'Available', false, 20.0, '231231231', callback)
    },
    function (callback) {
      carInstanceCreate(cars[3], 'Available', false, 250.0, '123312', callback)
    }
  ],
    // Optional callback
  cb)
}

async.series([
  createCarTypes,
  createCars,
  createCarInstances
],
// Optional callback
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('CARInstances: ' + carinstances)
  }
  // All done, disconnect from database
  mongoose.connection.close()
})
