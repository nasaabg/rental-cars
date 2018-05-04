var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new Schema({
  admin: Boolean,
  username: String,
  password: String
})

UserSchema.plugin(passportLocalMongoose)

global.UserSchema = global.UserSchema || mongoose.model('User', UserSchema)
module.exports = global.UserSchema
