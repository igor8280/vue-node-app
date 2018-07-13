const utils = {
	/**
	 * convert sort object to string (api parameter)
	 * sort object must have prop and order properties
	 * @param {Object} sort
	 * @returns {string}
	 */
	sortToString(sort = null) {
		if (!sort)
			sort = this.sort;

		return (sort.order === 'descending' ? '-' : '') + sort.prop;
	},
	/**
	 * check if sort is changed and apply newSort
	 * rules:
	 * 	table must have attribute ref with value table (ref="table")
	 * 	default sort must be setted like this:
	 * 		sort: {
	 * 			prop: 'example',
	 * 			order: 'ascending' or 'descending'
 	 * 		}
	 * @param {Object} newSort
	 * @param {Function} callback execute after change
	 */
	changeSort(newSort, callback) {
		if (newSort.prop !== this.sort.prop || newSort.order !== this.sort.order) {
			if (newSort.prop)
				this.sort.prop = newSort.prop;

			this.sort.order = (newSort.order === null) ? 'ascending' : newSort.order;
			this.$refs.table.sort(this.sort.prop, this.sort.order);
			callback();
		}
	},
	/**
	 * get array of ids from selected rows
	 * @param {Array} rows array of selected rows (objects)
	 * @returns {Array}
	 */
	rowsIds(rows) {
		return rows.map(row => row._id);
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
	 * this function is trying to collect:
	 *		pagination,
	 *		sort,
	 *		search,
	 *		filter,
	 *		data
	 * from component data object
	 * @param {String} key location name where to store data
	 */
	autoSave(key = '') {
		// if key is not set use component name as key
		if (!key)
			key = this.$options.name;

		let local = {};
		let session = {};

		// auto check for this properties
		let pag = this.pagination;
		let sort = this.sort;
		let search = this.search;
		let filter = this.filter;
		let data = this.data;

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
		this.$store.commit('saveLocal', {key, value: local});
		this.$store.commit('saveSession', {key, value: session});
	},
	/**
	 * auto collect and load data in vue component
	 * @param {String} key
	 */
	autoLoad(key = '') {
		// if key is not set use component name as key
		if (!key)
			key = this.$options.name;

		let local = this.$store.getters.local[key] || {};
		let session = this.$store.getters.session[key] || {};

		// ensure that pagination has all the necessary properties before proceeding
		this.pagination = Object.assign(utils.defaultPagination(), this.pagination);

		// auto check for this properties
		let pag = this.pagination;
		let sort = local.sort;
		let search = session.search;
		let filter = session.filter;
		let data = session.data;

		if (local.limit)
			pag.limit = local.limit;
		if (session.page)
			pag.page = session.page;
		if (sort)
			this.sort = sort;
		if (search)
			this.search = search;
		if (filter)
			this.filter = filter;
		if (data)
			this.data = data;
	},
	/**
	 * show message to user
	 * default message type is success
	 * @param {Object} message http://element.eleme.io/#/en-US/component/message
	 */
	showMessage(message) {
		if (!message.type)
			message.type = 'success';

		this.$message(message);
	},
	/**
	 * browser history go back
	 * @param {Object} message show message
	 */
	goBack(message = null) {
		this.$store.dispatch('goBack').then(route => {
			if (message)
				this.$utils('showMessage', message);

			this.$router.replace(route);
		});
	},
	/**
	 * handlig response errors
	 * @param {Object} error
	 */
	handleError(error) {
		console.error(error);
		this.$utils('showMessage', {
			type: 'error',
			message: error.body.message + '. ' + error.body.description
		});
	}
};

export default utils;
