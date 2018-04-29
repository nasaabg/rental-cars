var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CarTypeSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: false}
  }
)

// Virtual for car's URL
CarTypeSchema
  .virtual('url')
  .get(function () {
    return '/catalog/cartype/' + this._id
  })

// Export model
module.exports = mongoose.model('CarType', CarTypeSchema)
