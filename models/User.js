const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String, 
		required: [true, 'Please provide username']
	},
	password: {
		type: String,
		required: [true, 'Please provide password']
	}
})

module.exports = mongoose.model('User', UserSchema);