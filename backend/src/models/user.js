import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
	firstName: {type: String, maxlength: 100},
	lastName: {type: String, maxlength: 100},
	username: {type: String, required:true, unique: true, minlength: 3, maxlength: 100},
	password: {type: String, required: true , minlength: 6, maxlength: 100},
	roles: [String]
}, {'collection': 'users'});

module.exports = mongoose.model('UserModel', UserModelSchema);