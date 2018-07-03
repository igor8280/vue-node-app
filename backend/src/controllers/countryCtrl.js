// import mongoose from 'mongoose';
import { Router } from 'express';
import CountryModel from '../models/countryModel';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/countries/add' - creating endpoint for POST (Create)
	api.post('/add', (req, res) => {
		// create data model
		let countryModel = new CountryModel();

		// set data model values from request
		// required attributes
		countryModel.name = req.body.name;
		countryModel.isoCodeTwo = req.body.isoCodeTwo;
		countryModel.isoCodeThree = req.body.isoCodeThree;

		// optional attributes
		if (req.body.shortListed)
			countryModel.shortListed = req.body.shortListed;
		if (req.body.description)
			countryModel.description = req.body.description;
		if (req.body.taxRate)
			countryModel.taxRate = req.body.taxRate;
		if (req.body.currency)
			countryModel.currency = req.body.currency;

		// custom validation --- BICE INTEGRISANA U SCHEMU

		// save data to database
		countryModel.save(err => {
			// on error return err object
			if (err) res.send(err);

			// create data for response
			let data = req.body;
			data._id = countryModel._id;
			// else return message
			res.json({ message: 'Country added successfully!', "data": data});
		});
	});

	// 'v1/countries' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		let page = req.page || 1;
		let limit = req.limit || 12;

		// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
		CountryModel.aggregatePaginate({}, {"page": page, "limit": limit} ,(err, countries, pageCount, itemCount) => {
			// on error return err object
			if (err) res.send(err);

			// return data (plural!!!)
			let data = {"content": countries, "pages": pageCount, "total": itemCount, "page": page, "limit": limit};
			res.json(data);
		});

		// plain PAGINATION (for simpler queries - https://www.npmjs.com/package/mongoose-paginate/v/5.0.3)
		// CountryModel.paginate({}, {"page": page, "limit": limit} ,(err, countries) => {
		// 	// on error return err object
		// 	if (err) res.send(err);
		//
		// 	// return data (plural!!!)
		// 	res.json(countries);
		// });
	});

	// 'v1/countries/:id' - Read one
	api.get('/:id', (req, res) => {
		if (req.params.id) {
			CountryModel.findById(req.params.id, (err, country) => {
				// on error return err object
				if (err) res.send(err);

				// return ONE document
				res.json(country);
			});
		}
	});

	// 'v1/countries/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// create data model
		let countryModel = {};

		// set data model values from request
		// required attributes
		countryModel.name = req.body.name;
		countryModel.isoCodeTwo = req.body.isoCodeTwo;
		countryModel.isoCodeThree = req.body.isoCodeThree;

		// optional attributes
		if (req.body.shortListed)
			countryModel.shortListed = req.body.shortListed;
		if (req.body.description)
			countryModel.description = req.body.description;
		if (req.body.taxRate)
			countryModel.taxRate = req.body.taxRate;
		if (req.body.currency)
			countryModel.currency = req.body.currency;

		// check if ID exists and its value
		if (req.params.id) {
			CountryModel.findByIdAndUpdate(req.params.id, countryModel, {"new": true}, (err, data) => {
				if (err) res.send(err);

				// console.log('res update', data);
				res.json({message: "Update successful", "data": data});
			});
		}
	});

	// '/v1/countries/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		if (req.params.id) {
			CountryModel.findByIdAndDelete(req.params.id, (err, data) => {
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