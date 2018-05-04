var mongoose = require('mongoose')

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
  .virtual('img_url')
  .get(function () {
    return 'https://s3-ap-southeast-2.amazonaws.com/imotor-cms/images_cms/Skoda_Latest_Offers_Opportunity_Link-Jul17-CY.jpg'
  })

CarSchema
  .virtual('reservation_url')
  .get(function () {
    return '/cars/' + this._id + '/reservation'
  })

// Export model
module.exports = mongoose.model('Car', CarSchema)
