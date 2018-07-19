/**
 * generate error message in format:
 * {
 * 		code: Number 			http status code
 * 		name: String			error name
 * 		message: String 		user friendly error message
 * 		description: String		detailed message for debugging
 * }
 */

/**
 *	default http error responses
 */
export const defaultErrors = {
	badRequest: {
		code: 400,
		message: 'Bad request'
	},
	unauthorized: {
		name: 'Authorization',
		code: 401,
		message: 'Not authorized!',
		description: 'No Authorization header!'
	},
	notFound: {
		name: 'NotFound',
		code: 404,
		message: 'Record not found',
		description: ''
	},
	internalServerError: {
		code: 500,
		message: 'Internal server error'
	}
};

export default {
	/**
	*	defining custom errors
	*/
	BadUsername(res) {
		return sendError({
			name: 'BadUsername',
			code: 401,
			message: 'Authentication failed',
			description: 'User not found'
		}, res);
	},
	BadPassword(res) {
		return sendError({
			name: 'BadPassword',
			code: 401,
			message: 'Authentication failed',
			description: 'Wrong password'
		}, res);
	},
	Unauthorized(res) {
		return sendError(defaultErrors.unauthorized, res);
	},
	AccessTokenExpired(token, res) {
		let error = {
			name: 'AccessTokenExpired',
			code: 401,
			message: 'Invalid access token',
			description: 'Access token expired: ' + token
		};
		res.append('WWW-Authenticate', 'error: ' + error.message + '. ' + error.description);
		return sendError(error, res);
	},
	RefreshTokenExpired(token, res) {
		let error = {
			name: 'RefreshTokenExpired',
			code: 401,
			message: 'Invalid refresh token',
			description: 'Refresh token expired: ' + token
		};
		res.append('WWW-Authenticate', 'error: ' + error.message + '. ' + error.description);
		return sendError(error, res);
	},
	NotFound(res, customData = {}) {
		return sendError(Object.assign({}, defaultErrors.notFound, customData), res);
	},
	FileSizeLimit(res, limit) {
		let error = {
			name: 'FileSizeLimit',
			description: 'File size limit exceeded. Maximum allowed size: ' + limit
		};
		return sendError(Object.assign(error, defaultErrors.badRequest), res);
	},
	FileType(res, types) {
		let error = {
			name: 'FileType',
			description: 'File type not allowed. Allowed file types: ' + types
		};
		return sendError(Object.assign(error, defaultErrors.badRequest), res);
	},
	/**
	 *	when error handler doesn't find error to return
	 *	then UnknownError is used
	 */
	UnknownError(customData) {
		return Object.assign({}, defaultErrors.internalServerError, customData);
	},
	/**
	*	mongoose errors
 	*/
	CastError(customData) {
		console.log('customData', customData);
		return Object.assign({},  defaultErrors.badRequest, customData);
	},
	ValidationError(customData) {
		return Object.assign({},  defaultErrors.badRequest, customData);
	}
};

/**
 * send error to express response or return error object
 * @param res express response object
 * @param error	object to send
 */

export const sendError = (error, res)  => {
	// if there is no error.code (it's 'Bad request' - bad ObjectId() )
	if (!error.code)
		error.code = 400;
	return res ? res.status(error.code).send(error) : error;
};
