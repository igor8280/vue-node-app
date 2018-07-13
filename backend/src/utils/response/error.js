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
		code: 401,
		message: 'Authorization required'
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
	NotFound(res, customData = {}) {
		return sendError(Object.assign({}, defaultErrors.notFound, customData), res);
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
	return res ? res.status(error.code).send(error) : error;
};
