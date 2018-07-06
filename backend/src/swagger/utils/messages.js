export default {
	summary: {
		getAll: 'Returns all entries',
		getById: 'Returns an entry with the given id',
		post: 'Creates a new entry',
		put: 'Updates an entry with the given id',
		delete: 'Deletes an entry with the given id'
	},
	parameters: {
		body: {
			data: {
				post: 'Data for entry that we want to create',
				put: 'Data for entry that we want to update'
			}
		},
		path: {
			id: 'ID of entry'
		},
		query: {
			page: 'Results page you want to retrieve (0…N)',
			limit: 'Number of records per page',
			sort: 'Sorting criteria in the format name or -name'
		}
	},
	response: {
		200: {
			getAll: 'Entries returned',
			getById: 'Entry returned'
		},
		201: 'Entry created',
		204: {
			put: 'Entry updated',
			delete: 'Entry deleted'
		},
		400: 'Request parameters malformed',
		401: {
			post: 'You are not authorized to create this entry',
			put: 'You are not authorized to update this entry',
			delete: 'You are not authorized to delete this entry'
		},
		404: 'Entry not found',
		500: 'Internal server error occurred'
	}
};