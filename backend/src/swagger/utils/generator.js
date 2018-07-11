import messages from './messages';

export default {
	responses (statusCodes=[], requestType='') {
		let responses = {};
		statusCodes.forEach(code => {
			let msg = messages.response[code];
			if (typeof msg === 'object')
				msg = msg[requestType];

			responses[code] = {
				description: msg
			};
		});
		return responses;
	},
	getAll(tag, schema, params = {}) {
		let tags = (typeof tag === 'object') ? tag : [tag];

		let parameters = [
			{
				in: 'query',
				name: 'page',
				description: messages.parameters.query.page
			},
			{
				in: 'query',
				name: 'limit',
				description: messages.parameters.query.limit
			},
			{
				in: 'query',
				name: 'sort',
				description: messages.parameters.query.sort
			}
		];

		if (typeof params.parameters === 'object')
			parameters = parameters.concat(params.parameters);

		let summary = params.summary || messages.summary.getAll;

		let responses = Object.assign({
			200: {
				description: messages.response[200].getAll,
				schema: {
					properties: {
						content: {
							type: 'array',
							items: schema
						},
						pages: {
							type: 'number'
						},
						total: {
							type: 'number'
						},
						page: {
							type: 'number'
						},
						limit: {
							type: 'number'
						}
					}
				}
			}
		}, this.responses([500]));

		if (typeof params.responses === 'object')
			Object.assign(responses, params.responses);

		return {
			tags,
			summary,
			parameters,
			responses
		};
	},
	idParameter() {
		return {
			name: 'id',
			in: 'path',
			required: true,
			description: messages.parameters.path.id,
			type: 'string'
		}
	},
	getById(tag, schema, params = {}) {
		let tags = (typeof tag === 'object') ? tag : [tag];

		let parameters = [];
		if (typeof params.parameters === 'object')
			parameters = parameters.concat(params.parameters);

		let summary = params.summary || messages.summary.getById;

		let responses = Object.assign({
			200: {
				description: messages.response[200].getById,
				schema
			}
		}, this.responses([404, 500]));

		if (typeof params.responses === 'object')
			Object.assign(responses, params.responses);

		return {
			tags,
			summary,
			parameters,
			responses
		};
	},
	post(tag, schema, params = {}) {
		let tags = (typeof tag === 'object') ? tag : [tag];

		let parameters = [
			{
				name: 'data',
				required: true,
				in: 'body',
				description: messages.parameters.body.data.post,
				schema
			}
		];
		if (typeof params.parameters === 'object')
			parameters = parameters.concat(params.parameters);

		let summary = params.summary || messages.summary.post;

		let responses = this.responses([201, 400, 401, 500], 'post');

		if (typeof params.responses === 'object')
			Object.assign(responses, params.responses);

		return {
			tags,
			summary,
			parameters,
			responses,
			produces: ['application/json']
		};
	},
	put(tag, schema, params = {}) {
		let tags = (typeof tag === 'object') ? tag : [tag];

		let parameters = [
			{
				name: 'data',
				required: true,
				in: 'body',
				description: messages.parameters.body.data.put,
				schema
			}
		];
		if (typeof params.parameters === 'object')
			parameters = parameters.concat(params.parameters);

		let summary = params.summary || messages.summary.put;

		let responses = this.responses([204, 400, 401, 500], 'put');

		if (typeof params.responses === 'object')
			Object.assign(responses, params.responses);

		return {
			tags,
			summary,
			parameters,
			responses,
			produces: ['application/json']
		};
	},
	delete(tag, schema, params = {}) {
		let tags = (typeof tag === 'object') ? tag : [tag];

		let parameters = [];
		if (typeof params.parameters === 'object')
			parameters = parameters.concat(params.parameters);

		let summary = params.summary || messages.summary.delete;

		let responses = this.responses([204, 400, 401, 500], 'delete');

		if (typeof params.responses === 'object')
			Object.assign(responses, params.responses);

		return {
			tags,
			summary,
			parameters,
			responses
		};
	}
};
