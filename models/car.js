var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CarSchema = new Schema(
  {
    name: {type: String, required: true},
    model: {type: String, required: true},
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

// Export model
module.exports = mongoose.model('Car', CarSchema)
