import store from './store';

export default {
	/**
	 * convert sort object to string (api parameter)
	 * @param {Object} sort
	 * @returns {string}
	 */
	sortToString(sort) {
		return (sort.order === 'descending' ? '-' : '') + sort.prop;
	},
	/**
	 * check if sort is changed and apply newSort
	 * @param {Object} newSort
	 * @param {Object} sort reference to current sort object
	 * @param {Object} table reference to table
	 * @param {Function} callback execute after change
	 */
	changeSort(newSort, sort, table, callback) {
		if (newSort.prop !== sort.prop || newSort.order !== sort.order) {
			if (newSort.prop)
				sort.prop = newSort.prop;

			sort.order = (newSort.order === null) ? 'ascending' : newSort.order;
			table.sort(sort.prop, sort.order);
			callback();
		}
	},
	/**
	 * default value for pagination
	 * @returns {Object}
	 */
	defaultPagination() {
		return {
			page: 1,
			limit: 10,
			total: 0
		};
	},
	/**
	 * auto collect, arrange and save data in store
	 * @param {Object} context vue component
	 * @param {String} key
	 */
	autoSave(context, key = '') {
		// if key is not set use component name as key
		if (!key)
			key = context.$options.name;

		let local = {};
		let session = {};

		// auto check for this properties
		let pag = context.pagination;
		let sort = context.sort;
		let search = context.search;
		let filter = context.filter;
		let data = context.data;

		if (pag) {
			if (pag.limit)
				local.limit = pag.limit;

			if (pag.page)
				session.page = pag.page;
		}
		if (sort)
			local.sort = sort;
		if (search)
			session.search = search;
		if (filter)
			session.filter = filter;
		if (data)
			session.data = data;

		// save collected data
		store.commit('saveLocal', {key, value: local});
		store.commit('saveSession', {key, value: session});
	},
	/**
	 * auto collect and load data in vue component
	 * @param {Object} context vue component
	 * @param {String} key
	 */
	autoLoad(context, key = '') {
		// if key is not set use component name as key
		if (!key)
			key = context.$options.name;

		let local = store.getters.local[key] || {};
		let session = store.getters.session[key] || {};

		// ensure that pagination has all the necessary properties before proceeding
		context.pagination = Object.assign(this.defaultPagination(), context.pagination);

		// auto check for this properties
		let pag = context.pagination;
		let sort = local.sort;
		let search = session.search;
		let filter = session.filter;
		let data = session.data;

		if (local.limit)
			pag.limit = local.limit;
		if (session.page)
			pag.page = session.page;
		if (sort)
			context.sort = sort;
		if (search)
			context.search = search;
		if (filter)
			context.filter = filter;
		if (data)
			context.data = data;
	}
};
