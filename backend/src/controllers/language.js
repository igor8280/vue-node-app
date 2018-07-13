import { Router } from 'express';
import LanguageModel, {LanguageModelSchema} from '../models/language';
import response from '../utils/response';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/languages/add' - creating endpoint for POST (Create)
	api.post('/', (req, res) => {
		// create data model
		let languageModel = new LanguageModel();

		// set data model values from request
		LanguageModelSchema.eachPath(path => {
			if (req.body.hasOwnProperty(path))
				languageModel[path] = req.body[path];
		});

		// save data to database
		languageModel.save(err => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// else return message and inserted data
			response.success.post(languageModel, res);
		});
	});

	// 'v1/languages' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		// parse URL query string (for pagination)
		let page = req.query.page || 1;
		let limit = req.query.limit || 10;
		let sortBy = req.query.sort || {'name': 1};

		// search with aggregation using Regex()
		let agg = LanguageModel.aggregate();
		if (req.query.search) {
			let search = new RegExp(`^${req.query.search}`, 'i');
			agg.match( {$or :[{name: search}, {isoCodeOne: search}, {isoCodeTwoB: search}, {isoCodeTwoT: search}]});
		}

		// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
		LanguageModel.aggregatePaginate(agg, {page, limit, sortBy} ,(err, content, pages, total) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// return data (plural!!!)
			let data = {content, pages, total, page, limit};
			res.json(data);
		});
	});

	// 'v1/languages/:id' - Read one
	api.get('/:id', (req, res) => {
		LanguageModel.findById(req.params.id, (err, language) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// language not found
			if (!language) return response.error.NotFound(res);

			// return ONE document
			res.json(language);
		});
	});

	// 'v1/languages/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// create data model
		let languageModel = {};

		// set data model values from request
		LanguageModelSchema.eachPath(path => {
			if (LanguageModelSchema.paths[path].required || req.body.hasOwnProperty(path))
				languageModel[path] = req.body[path];
		});

		let options = {
			"new": true,
			runValidators: true
		};
		LanguageModel.findByIdAndUpdate(req.params.id, languageModel, options, (err, data) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// language not found
			if (!data) return response.error.NotFound(res);

			response.success.put(data, res);
		});
	});

	// '/v1/languages/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		LanguageModel.findByIdAndDelete(req.params.id, (err, data) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// language not found
			if (!data) return response.error.NotFound(res);

			// else return message
			response.success.delete(data, res);
		});
	});

	// return api
	return api;
};
