import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import config from "../config";

const ACCESS_TOKEN_TIME = 60*10; // 10 min
const REFRESH_TOKEN_TIME = 60*60*24*180; // 180 days

let generateAccessToken = (req, res, next) => {
	// console.log('4 generateAccessToken');
	// !!! access token should be short-time living (10-15min)
	let access_token = jwt.sign({ username: req.body.username, _id: req.body._id}, config.salt.access_token, { expiresIn: ACCESS_TOKEN_TIME });
	// console.log('access token', access_token);
	// !!! refresh token should be long-time living (1-3 month)
	let refresh_token = jwt.sign({ username: req.body.username, _id: req.body._id}, config.salt.access_token, { expiresIn: REFRESH_TOKEN_TIME });

	// decoded token (for expiration time only)
	let decode = jwt.decode(access_token);

	// response object according to - https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/
	let token = {
		'access_token': access_token,
		'refresh_token': refresh_token,
		'token_type': 'bearer',
		'expires_in': decode.exp - decode.iat
	};
	// console.log('5 response', token);
	respond(res, token);
	// return response;
	// next(response);
};

let refreshAccessToken = (req, res, next, refresh_token) => {
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

		let token = {
			'access_token': access_token,
			'refresh_token': refresh_token,
			'token_type': 'bearer',
			'expires_in': decode.exp - decode.iat
		};

		respond(res, token);
		// return response;
	});
};

let respond = (res, token) => {
	res.append('Cache-Control', 'no-store');
	res.append('Pragma', 'no-cache');

	res.json(token);
};

let comparePassword = (password, hash_password) => {
	// console.log('3 bcrypt', password);
	return bcrypt.compare(password, hash_password);
};

let authenticate = (req, res, next) => {
	// auth middleware
	if (req.headers.authorization) {
		let access_token = req.headers.authorization.split(' ')[1];

		try {
			jwt.verify(access_token, config.salt.access_token);
			next();
		} catch (e) {
			let custom = {
				'error': 'invalid_token',
				'error_description': 'Access token expired:' + access_token
			};
			let error = 'error ' + custom.error + ' error_description ' + custom.error_description;

			res.append('WWW-Authenticate', error);
			res.append('Cache-Control', 'no-store');
			res.append('Pragma', 'no-cache');
			res.status(401).send(custom);
		}
	} else {
		res.status(401).send('No Authorization header!');
		// next();
	}
};

module.exports = {
	authenticate,
	comparePassword,
	generateAccessToken,
	refreshAccessToken
};