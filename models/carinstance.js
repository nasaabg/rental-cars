var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CarInstanceSchema = new Schema(
  {
    car: { type: Schema.ObjectId, ref: 'Car', required: true },
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now},
    price_day: {typ: Schema.Types.Decimal128, default: 0.0},
    vin_number: {type: String, required: true}
  }
)

// Virtual for carinstance's URL
CarInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/carinstance/' + this._id
  })

// Export model
module.exports = mongoose.model('CarInstance', CarInstanceSchema)
