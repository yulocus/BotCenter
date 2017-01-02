var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// user schema
var UserSchema = new Schema({
    id: ObjectId,
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

