var mongoose = require('mongoose')
var CarReservation = require('../models/carReservation')

var Schema = mongoose.Schema

var CarSchema = new Schema(
  {
    name: {type: String, required: true},
    model: {type: String, required: true},
    price_day: {type: Number, required: true},
    vin_number: {type: String, required: true},
    car_type: [{type: Schema.ObjectId, ref: 'CarType'}],
    description: {type: String, required: false}
  }

)

// Virtual for car's URL
CarSchema
  .virtual('url')
  .get(function () {
    return '/cars/' + this._id
  })

CarSchema
  .virtual('reservation_url')
  .get(function () {
    return '/cars/' + this._id + '/reservation'
  })

CarSchema
  .virtual('availableFor')
  .get(function () {
    CarReservation.find({'car': this._id})
      .exec(function (reservations) {
        console.log(reservations)
        return reservations
      })
  })

// Export model
module.exports = mongoose.model('Car', CarSchema)
