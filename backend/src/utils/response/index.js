import error, {defaultErrors, sendError} from './error';
import success from './success';
import log from '../log';

export default {
	defaultErrors,
	error,
	sendError,
	success,
	/**
	 * standard response when we want to retrieve multiple documents and return paginated response
	 * @param err
	 * @param {Array} content array of documents
	 * @param pages total pages
	 * @param total documents
	 * @param {Object} options {page, limit, sortBy}
	 * @param res express response object
	 */
	paginate(err, content, pages, total, options, res) {
		// on error return err object
		if (err) return sendError(err, res);

		// return paginated response
		return res.json({
			content,
			total,
			pages,
			page: parseInt(options.page),
			limit: parseInt(options.limit),
			sortBy: options.sortBy
		});
	},
	/**
	 * standard response when we want to find one document
	 * IMPORTANT NOTE:
	 * 		this function must be called with bind(res)
	 * 		where res is express response object
	 * @param err
	 * @param doc
	 */
	findById(err, doc) {
		log.error(err);
		log.info(new Error("My Error"));
		log.warn({name: 'test', message: 'msg....'});
		// on error return err object
		if (err) return sendError(err, this);

		// document not found
		if (!doc) return error.NotFound(this);

		// return document
		return this.json(doc);
	},
	/**
	 * standard response when we want to save document
	 * IMPORTANT NOTE:
	 * 		this function must be called with bind(res)
	 * 		where res is express response object
	 * @param err
	 * @param doc
	 */
	save(err, doc) {
		// on error return err object
		if (err) return sendError(err, this);

		// return document
		return success.post(doc, this);
	},
	/**
	 * standard response when we want to update one document
	 * IMPORTANT NOTE:
	 * 		this function must be called with bind(res)
	 * 		where res is express response object
	 * @param err
	 * @param doc
	 */
	findByIdAndUpdate(err, doc) {
		// on error return err object
		if (err) return sendError(err, this);

		// document not found
		if (!doc) return error.NotFound(this);

		// return document
		return success.put(doc, this);
	},
	/**
	 * standard response when we want to delete one document
	 * IMPORTANT NOTE:
	 * 		this function must be called with bind(res)
	 * 		where res is express response object
	 * @param err
	 * @param doc
	 */
	findByIdAndDelete(err, doc) {
		// on error return err object
		if (err) return sendError(err, this);

		// document not found
		if (!doc) return error.NotFound(this);

		// return document
		return success.delete(doc, this);
	}
}
