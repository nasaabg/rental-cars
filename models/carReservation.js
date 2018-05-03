var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CarReservationSchema = new Schema(
  {
    car: { type: Schema.ObjectId, ref: 'Car', required: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    status: {type: String, required: true, enum: ['Reserved', 'Confirmed', 'Canceled']},
    reserved_from: {type: Date},
    reserved_to: {type: Date},
  }
)

// Virtual for carinstance's URL
CarReservationSchema
  .virtual('url')
  .get(function () {
    return '/catalog/car_reservation/' + this._id
  })

// Export model
module.exports = mongoose.model('CarReservation', CarReservationSchema)
