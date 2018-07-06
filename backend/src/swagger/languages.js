import generator from './utils/generator';

let tag = 'Languages';
let schema = {$ref: '#/definitions/Language'};

export default {
	tags: [
		{
			name: tag,
			description: 'Endpoints for language management'
		}
	],
	paths: {
		'/languages': {
			get: generator.getAll(tag, schema),
			post: generator.post(tag, schema)
		},
		'/languages/{id}': {
			parameters: [generator.idParameter()],
			get: generator.getById(tag, schema),
			put: generator.put(tag, schema),
			delete: generator.delete(tag, schema)
		}
	},
	definitions: {
		Language: {
			required: [
				'name',
				'isoCodeTwoB'
			],
			properties: {
				_id: {
					type: 'string',
					uniqueItems: true
				},
				name: {
					type: 'string',
					maxLength: 100
				},
				shortListed: {
					type: 'boolean',
					default: false
				},
				isoCodeOne: {
					type: 'string',
					minLength: 2,
					maxLength: 2
				},
				isoCodeTwoB: {
					type: 'string',
					minLength: 3,
					maxLength: 3
				},
				isoCodeTwoT: {
					type: 'string',
					minLength: 3,
					maxLength: 3
				},
				description: {
					type: 'string'
				}
			}
		}
	}
}