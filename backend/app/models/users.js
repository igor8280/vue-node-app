const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: String,
	lastName: String,
	phone: Number
});

module.exports = mongoose.model('User', UserSchema);
