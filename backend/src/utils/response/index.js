import error, {defaultErrors, sendError} from './error';
import success from './success';

/**
 * standard response when we want to retrieve multiple documents and return paginated response
 * @param err
 * @param {Array} content array of documents
 * @param pages total pages
 * @param total documents
 * @param {Object} options {page, limit, sortBy}
 * @param res express response object
 */
const paginate = (err, content, pages, total, options, res) => {
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
};
/**
 * standard response when we want to find one document
 * @param err
 * @param doc
 * @param res express response object
 */
const findById = (err, doc, res) => {
	// on error return err object
	if (err) return sendError(err, res);

	// document not found
	if (!doc) return error.NotFound(res);

	// return document
	return res.json(doc);
};
/**
 * standard response when we want to save document
 * @param err
 * @param doc
 * @param res express response object
 */
const save = (err, doc, res) => {
	// on error return err object
	if (err) return sendError(err, res);

	// return document
	return success.post(doc, res);
};
/**
 * standard response when we want to update one document
 * @param err
 * @param doc
 * @param res express response object
 */
const findByIdAndUpdate = (err, doc, res) => {
	// on error return err object
	if (err) return sendError(err, res);

	// document not found
	if (!doc) return error.NotFound(res);

	// return document
	return success.put(doc, res);
};
/**
 * standard response when we want to delete one document
 * @param err
 * @param doc
 * @param res express response object
 */
const findByIdAndDelete = (err, doc, res) => {
	// on error return err object
	if (err) return sendError(err, res);

	// document not found
	if (!doc) return error.NotFound(res);

	// return document
	return success.delete(doc, res);
};

export default {
	defaultErrors,
	error,
	sendError,
	success,
	paginate,
	findById,
	save,
	findByIdAndUpdate,
	findByIdAndDelete
}
