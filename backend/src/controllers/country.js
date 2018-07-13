import { Router } from 'express';
import CountryModel, {CountryModelSchema} from '../models/country';
import response from '../utils/response';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/countries/' - creating endpoint for POST (Create)
	api.post('/', (req, res) => {
		// create data model
		let countryModel = new CountryModel();

		// set data model values from request
		CountryModelSchema.eachPath(path => {
			if (CountryModelSchema.paths[path].isRequired || req.body.hasOwnProperty(path))
				countryModel[path] = req.body[path];
		});

		// save data to database
		countryModel.save(err => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// else return message and inserted data
			response.success.post(countryModel, res);
		});
	});

	// 'v1/countries' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		// parse URL query string (for pagination)
		let page = req.query.page || 1;
		let limit = req.query.limit || 10;
		let sortBy = req.query.sort || {'name': 1};

		// search with aggregation using Regex()
		let agg = CountryModel.aggregate();
		if (req.query.search) {
			let search = new RegExp(`^${req.query.search}`, 'i');
			agg.match( {$or :[{name: search}, {isoCodeTwo: search}, {isoCodeThree: search}]});
		}

		// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
		CountryModel.aggregatePaginate(agg, {page, limit, sortBy} ,(err, content, pages, total) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// return data (plural!!!)
			res.json({content, pages, total, page, limit});
		});
	});

	// 'v1/countries/:id' - Read one
	api.get('/:id', (req, res) => {
		CountryModel.findById(req.params.id, (err, country) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// country not found
			if (!country) return response.error.NotFound(res);

			// return ONE document
			res.json(country);
		});
	});

	// 'v1/countries/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// create data model
		let countryModel = {};

		// set data model values from request
		CountryModelSchema.eachPath(path => {
			if (CountryModelSchema.paths[path].isRequired || req.body.hasOwnProperty(path))
				countryModel[path] = req.body[path];
		});
		let options = {
			"new": true,
			runValidators: true
		};
		CountryModel.findByIdAndUpdate(req.params.id, countryModel, options, (err, data) => {
			if (err) return response.sendError(err, res);

			// country not found
			if (!data) return response.error.NotFound(res);

			// console.log('res update', data);
			response.success.put(data, res);
		});
	});

	// '/v1/countries/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		CountryModel.findByIdAndDelete(req.params.id, (err, data) => {
			// on error return err object
			if (err) return response.sendError(err, res);

			// country not found
			if (!data) return response.error.NotFound(res);

			// else return message
			response.success.delete(data, res);
		});
	});

	// return api
	return api;
};
