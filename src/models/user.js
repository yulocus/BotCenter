mongoose = require 'mongoose'
Schema = mongoose.Schema

# User schema
UserSchema = new Schema
	id: String
	first_name: String 
	last_name: String
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

