import { Router } from 'express';
import LanguageModel from '../models/language';
import utils from '../utils';
let response = utils.response;

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/languages/add' - creating endpoint for POST (Create)
	api.post('/', (req, res) => {
		// create data model with values from request
		let languageModel = utils.fillModel(LanguageModel, req.body);

		// save data to database
		languageModel.save(response.save.bind(res));
	});

	// 'v1/languages' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		// parse URL query string (for pagination)
		let pagination = utils.getPagination(req.query, {sortBy: 'name'});

		// search with aggregation using Regex()
		let agg = LanguageModel.aggregate();
		if (req.query.search) {
			let search = new RegExp(`^${req.query.search}`, 'i');
			agg.match( {$or :[{name: search}, {isoCodeOne: search}, {isoCodeTwoB: search}, {isoCodeTwoT: search}]});
		}

		// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
		LanguageModel.aggregatePaginate(agg, pagination ,(...args) => {
			response.paginate(...args, pagination, res);
		});
	});

	// 'v1/languages/:id' - Read one
	api.get('/:id', (req, res) => {
		LanguageModel.findById(req.params.id, response.findById.bind(res));
	});

	// 'v1/languages/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// create data model with values from request
		let languageModel = utils.fillModel(LanguageModel, req.body);

		let options = {
			"new": true,
			runValidators: true
		};
		LanguageModel.findByIdAndUpdate(req.params.id, languageModel, options, response.findByIdAndUpdate.bind(res));
	});

	// '/v1/languages/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		LanguageModel.findByIdAndDelete(req.params.id, response.findByIdAndDelete.bind(res));
	});

	// return api
	return api;
};
