var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var UserSchema = new Schema({
    id: String,
    first_name: String,
	last_name: String,
	image: String,
  	locale: String,
  	timezone: String,
	gender: String
});

// all schema
var User = mongoose.model('User', UserSchema);

// export schemas
module.exports = User

