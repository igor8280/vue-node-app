import _ from 'lodash';
import response from './response/index';

export default {
	response,
	/**
	 * create model and fill it with given data
	 * @param Model mongoose model
	 * @param {Object} data
	 * @returns {Object}
	 */
	fillModel(Model, data) {
		let model = new Model();
		let schema = model.schema;
		schema.eachPath(path => {
			if (schema.paths[path].isRequired || data.hasOwnProperty(path))
				model[path] = data[path];
		});
		return model;
	},
	/**
	 * return pagination object
	 * @param {Object} query request query params
	 * @param {Object} custom default properties to set if they are not in query
	 * @returns {{page: number, limit: number, sortBy: string}}
	 */
	getPagination(query, custom = {}) {
		let defaultPag = {
			page: 1,
			limit: 10,
			sortBy: ''
		};
		let pag = Object.assign({}, defaultPag);
		let maxLimit = 2000;
		let paths = Object.keys(pag);

		// filter data
		query = _.pick(query, paths);
		custom = _.pick(custom, paths);

		// overwrite pag with custom and query data
		Object.assign(pag, custom, query);

		// convert values to integers
		pag.limit = parseInt(pag.limit);
		pag.page = parseInt(pag.page);

		// check and correct data
		if (isNaN(pag.page))
			pag.page = defaultPag.page;
		if (pag.page < 1)
			pag.page = 1;

		if (isNaN(pag.limit))
			pag.limit = defaultPag.limit;
		if (pag.limit < 1)
			pag.limit = 1;
		if (pag.limit > maxLimit)
			pag.limit = maxLimit;

		return pag;
	}
}
