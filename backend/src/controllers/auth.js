import { Router } from 'express';
import UserModel from '../models/user';
import { generateAccessToken, comparePassword, refreshAccessToken} from '../middleware/authMiddleware';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// LOGIN - create access and refresh token
	api.post('/login', (req, res, next) => {
		console.log('1 req', req.body);
		// ask for new access and refresh tokens
		if (req.body.grant_type === 'password') {
			UserModel.findOne( {'username': req.body.username} ).then((user) => {
				// console.log('2 user', user);
				// if user does NOT exists
				if (!user) return res.status(401).json({ message: 'Authentication failed. User not found.' });

				comparePassword(req.body.password, user.password).then(valid => {
					if (valid)
						generateAccessToken(req, res, next);
					else
						res.status(401).json({ message: 'Authentication failed. Wrong password.' });
				});

				// if user exist, but password is wrong
				// if (!comparePassword(req.body.password, user.password))
				// 	res.status(401).json({ message: 'Authentication failed. Wrong password.' });

				// if everything is ok, check for grant_type
				// if grant_type=password, create new access and refresh token
				// generateAccessToken(req, res, next);
			}).catch((err) => {
				res.send(err);
			});
		}
		// ask for new access token (based on info in refresh token)
		else if (req.body.grant_type === 'refresh_token') {
			// let response = refreshAccessToken(req.body.refresh_token);
			refreshAccessToken(req, res, next, req.body.refresh_token);
		}
	});

	return api;
};
