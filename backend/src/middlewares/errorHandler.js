import response from '../utils/response';

export default class ErrorHandler {
	constructor(schema) {
		if (!schema)
			return;

		// Attach error handler on schema
		// http://mongoosejs.com/docs/middleware.html#error-handling

		// document middlewares
		// schema.post('init', this.handleErrors);
		// schema.post('validate', this.handleErrors);
		schema.post('save', this.handleErrors);
		schema.post('remove', this.handleErrors);

		// query middlewares
		schema.post('find', this.handleErrors);
		schema.post('findOne', this.handleErrors);
		schema.post('findOneAndRemove', this.handleErrors);
		schema.post('findOneAndUpdate', this.handleErrors);
		schema.post('update', this.handleErrors);
		schema.post('updateOne', this.handleErrors);
		schema.post('updateMany', this.handleErrors);

		//aggregate middlewares
		schema.post('aggregate', this.handleErrors);

		// model middlewares
		schema.post('insertMany', this.handleErrors);
	}

	// handleErrors is called only when error exist
	handleErrors(error, res, next) {
		let data = {
			name: error.name,
			description: error.message
		};

		if (!response.error.hasOwnProperty(error.name))
			return next(response.error.UnknownError(data));
		else
			return next(response.error[error.name](data));
	}
};
