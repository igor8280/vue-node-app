import { Router } from 'express';
import UserModel from '../models/user';
import utils from '../utils';

// create local instance -- shortcut
const response = utils.response;
const auth = utils.auth;

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// LOGIN - create access and refresh token
	api.post('/login', (req, res, next) => {
		// ask for new access and refresh tokens
		if (req.body.grant_type === 'password') {
			UserModel.findOne( {'username': req.body.username} ).then((user) => {
				// if user does NOT exists
				if (!user) return response.error.BadUsername(res);

				auth.comparePassword(req.body.password, user.password).then(valid => {
					if (valid)
						auth.generateAccessToken(req, res, next);
					else
						response.error.BadPassword(res);
				});
			}).catch((err) => {
				res.send(err);
			});
		}
		// ask for new access token (based on info in refresh token)
		else if (req.body.grant_type === 'refresh_token') {
			auth.refreshAccessToken(req, res, next, req.body.refresh_token);
		}
	});

	return api;
};
