mongoose = require 'mongoose'
Schema = mongoose.Schema

# User schema
UserSchema = new Schema
	name: String 
	image: String
  	locale: String
  	timezone: String
	gender: String

# All schema
User = mongoose.model 'User', UserSchema
ret =
  User: User

# Export schemas
module.exports = ret
