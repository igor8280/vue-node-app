import jwt from 'jsonwebtoken';
import config from "../config";
import UserModel from '../models/user';
import response from '../utils/response';


// set default headers for 'grant_type=password'. used as a middlewares
const setHeaders = (req, res, next) => {
	res.append('Cache-Control', 'no-store');
	res.append('Pragma', 'no-cache');
	next();
};


// verify access token. if invalid, create error object and send response
const authenticate = (req, res, next) => {
	// check ENVIRONMENT (for testing disable auth)
	if (config.env === 'test')
		next();
	else {
		// auth middlewares
		if (req.headers.authorization) {
			let access_token = req.headers.authorization.split(' ')[1];

			jwt.verify(access_token, config.salt.access_token, (err, decoded) => {
				if (err)
					response.error.AccessTokenExpired(access_token, res);
				else {
					// find user and add it to request object
					UserModel.findOne({username: decoded.username}, (err, user) => {
						req.user = user;
						next();
					});
				}

			});
		}
		else
			return response.error.Unauthorized(res);
	}
};

export {
	authenticate,
	setHeaders
};
