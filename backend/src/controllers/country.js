import { Router } from 'express';
import CountryModel from '../models/country';
import utils from '../utils';
let response = utils.response;

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/countries/' - creating endpoint for POST (Create)
	api.post('/', (req, res) => {
		// create data model with values from request
		let countryModel = utils.fillModel(CountryModel, req.body);

		// save data to database
		countryModel.save(response.save.bind(res));
	});

	// 'v1/countries' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		// parse URL query string (for pagination)
		let pagination = utils.getPagination(req.query, {sortBy: 'name'});

		// search with aggregation using Regex()
		let agg = CountryModel.aggregate();
		if (req.query.search) {
			let search = new RegExp(`^${req.query.search}`, 'i');
			agg.match( {$or :[{name: search}, {isoCodeTwo: search}, {isoCodeThree: search}]});
		}

		// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
		CountryModel.aggregatePaginate(agg, pagination, (...args) => {
			response.paginate(...args, pagination, res);
		});
	});

	// 'v1/countries/:id' - Read one
	api.get('/:id', (req, res) => {
		CountryModel.findById(req.params.id, response.findById.bind(res));
	});

	// 'v1/countries/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// create data model with values from request
		let countryModel = utils.fillModel(CountryModel, req.body);

		let options = {
			"new": true,
			runValidators: true
		};
		CountryModel.findByIdAndUpdate(req.params.id, countryModel, options, response.findByIdAndUpdate.bind(res));
	});

	// '/v1/countries/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		CountryModel.findByIdAndDelete(req.params.id, response.findByIdAndDelete.bind(res));
	});

	// return api
	return api;
};
