export default {
	/**
	 * send response after post action
	 * @param data inserted data
	 * @param res express response object
	 */
	post(data, res) {
		let msg = {
			message: 'Record added successfully!',
			data
		};

		return res.status(200).send(msg);
	},

	/**
	 * send response after put action
	 * @param data inserted data
	 * @param res express response object
	 */
	put(data, res) {
		let msg = {
			message: 'Record updated successfully!',
			data
		};

		return res.status(200).send(msg);
	},

	/**
	 * send response after delete action
	 * @param data inserted data
	 * @param res express response object
	 */
	delete(data, res) {
		let msg = {
			message: 'Record deleted successfully!',
			data
		};

		return res.status(200).send(msg);
	}
};
