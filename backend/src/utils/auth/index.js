import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import config from "../../config";
import response from '../response';

const ACCESS_TOKEN_TIME = 60 * 10; // 10 min
const REFRESH_TOKEN_TIME = 60 * 60 * 24 * 180; // 180 days

// generate access and refresh token. create response object and send response
const generateAccessToken = (req, res) => {
	// !!! access token should be short-time living (10-15min)
	let access_token = jwt.sign({ username: req.body.username, _id: req.body._id}, config.salt.access_token, { expiresIn: ACCESS_TOKEN_TIME });
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
	// return token
	res.json(token);
};

// verify refresh token. if valid, create new access token, response object and send response
const refreshAccessToken = (req, res, next, refresh_token) => {
	// validate refresh token
	return jwt.verify(refresh_token, config.salt.access_token, (err, decoded) => {
		if (err) return response.error.RefreshTokenExpired(refresh_token, res);

		// create NEW access token
		let access_token = jwt.sign({ username: decoded.username, _id: decoded._id}, config.salt.access_token, { expiresIn: ACCESS_TOKEN_TIME });
		// decoded token (for expiration time only)
		let decode = jwt.decode(access_token);

		let token = {
			'access_token': access_token,
			'refresh_token': refresh_token,
			'token_type': 'bearer',
			'expires_in': decode.exp - decode.iat
		};
		res.json(token);
	});
};

// comparing passwords with bcrypt - ASYNC
const comparePassword = (password, hash_password) => {
	return bcrypt.compare(password, hash_password);
};



export default {
	comparePassword,
	generateAccessToken,
	refreshAccessToken
};