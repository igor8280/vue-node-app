import { Router } from 'express';
import LanguageModel from '../models/language';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/languages/add' - creating endpoint for POST (Create)
	api.post('/', (req, res) => {
		// create data model
		let languageModel = new LanguageModel();

		// set data model values from request
		// required attributes
		languageModel.name = req.body.name;
		languageModel.isoCodeTwoB = req.body.isoCodeTwoB;

		// optional attributes
		if (req.body.isoCodeOne)
			languageModel.isoCodeOne = req.body.isoCodeOne;
		if (req.body.isoCodeTwoT)
			languageModel.isoCodeTwoT = req.body.isoCodeTwoT;
		if (req.body.shortListed)
			languageModel.shortListed = req.body.shortListed;
		if (req.body.description)
			languageModel.description = req.body.description;

		// save data to database
		languageModel.save(err => {
			// on error return err object
			if (err) res.send(err);

			// else return message and inserted data
			res.json({ 'message': 'Language added successfully!', 'data': languageModel});
		});
	});

	// 'v1/languages' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		// parse URL query string (for pagination)
		let page = req.query.page || 1;
		let limit = req.query.limit || 10;
		let sort = req.query.sort || {'name': 1};

		// search with aggregation using Regex()
		let agg = LanguageModel.aggregate();
		if (req.query.search) {
			let search = new RegExp(`^${req.query.search}`, 'i');
			agg.match( {$or :[{name: search}, {isoCodeOne: search}, {isoCodeTwoB: search}, {isoCodeTwoT: search}]});
		}

		// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
		LanguageModel.aggregatePaginate(agg, {"page": page, "limit": limit, "sortBy": sort} ,(err, languages, pageCount, itemCount) => {
			// on error return err object
			if (err) res.send(err);

			// return data (plural!!!)
			let data = {"content": languages, "pages": pageCount, "total": itemCount, "page": page, "limit": limit};
			res.json(data);
		});
	});

	// 'v1/languages/:id' - Read one
	api.get('/:id', (req, res) => {
		if (req.params.id) {
			LanguageModel.findById(req.params.id, (err, country) => {
				// on error return err object
				if (err) res.send(err);

				// return ONE document
				res.json(country);
			});
		}
	});

	// 'v1/languages/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// create data model
		let languageModel = {};

		// set data model values from request
		// required attributes
		languageModel.name = req.body.name;
		languageModel.isoCodeTwoB = req.body.isoCodeTwoB;

		// optional attributes
		if (req.body.isoCodeOne)
			languageModel.isoCodeOne = req.body.isoCodeOne;
		if (req.body.isoCodeTwoT)
			languageModel.isoCodeTwoT = req.body.isoCodeTwoT;
		if (req.body.shortListed)
			languageModel.shortListed = req.body.shortListed;
		if (req.body.description)
			languageModel.description = req.body.description;

		// check if ID exists and its value
		if (req.params.id) {
			LanguageModel.findByIdAndUpdate(req.params.id, languageModel, {"new": true}, (err, data) => {
				if (err) res.send(err);

				// console.log('res update', data);
				res.json({message: "Update successful", "data": data});
			});
		}
	});

	// '/v1/languages/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		if (req.params.id) {
			LanguageModel.findByIdAndDelete(req.params.id, (err, data) => {
				// 	// on error return err object
				if (err) res.send(err);

				// else return message
				res.json({message: "Document deleted successfully", "data": data});
			});
		}
	});

	// return api
	return api;
};