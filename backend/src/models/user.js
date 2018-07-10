import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
	firstName: {type: String, minlength: 3, maxlength: 100},
	lastName: {type: String, minlength: 3, maxlength: 100},
	username: {type: String, required:true, unique: true, minlength: 3, maxlength: 100},
	password: {type: String, required: true , minlength: 6, maxlength: 100},
	roles: [String]
}, {'collection': 'users'});

UserModelSchema.methods.generateAccessToken = function () {
	// !!! access token should be short-time living (10-15min)
	let access_token = jwt.sign({ username: this.username, _id: this._id}, config.salt.access_token, { expiresIn: 60 * 10 });

	// !!! refresh token should be long-time living (1-3 month)
	let refresh_token = jwt.sign({ username: this.username, _id: this._id}, config.salt.access_token, { expiresIn: 60 * 60 * 24 * 90 });

	// decoded token (for expiration time only)
	let decode = jwt.decode(access_token);

	// response object according to - https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/
	let response = {
		'access_token': access_token,
		'refresh_token': refresh_token,
		'token_type': 'bearer',
		'expires_in': decode.exp - decode.iat
	};

	return response;
};

UserModelSchema.methods.refreshAccessToken = function (refresh_token) {
	// validate refresh token
	return jwt.verify(refresh_token, config.salt.access_token, (err, decoded) => {
		// if token is invalid or expired
		if (err)
			return err;
			// return res.status(401).send('Refresh token expired!');

		// create NEW access token
		let access_token = jwt.sign({ username: decoded.username, _id: decoded._id}, config.salt.access_token, { expiresIn: 60 * 10 });
		// decoded token (for expiration time only)
		let decode = jwt.decode(access_token);

		let response = {
			'access_token': access_token,
			'refresh_token': refresh_token,
			'token_type': 'bearer',
			'expires_in': decode.exp - decode.iat
		};

		return response;
	});
};

UserModelSchema.methods.comparePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('UserModel', UserModelSchema);