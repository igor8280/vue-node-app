import { Router } from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import UserModel from '../models/user';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/users/' - creating endpoint for POST (Create)
	api.post('/', (req, res) => {
		// create data model
		let userModel = new UserModel();

		// set data model values from request
		// required attributes
		userModel.username = req.body.username;
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				// ovo je pitanje da li ovako treba da se ispita greska - odnosi se na lose hash-iranje
				if (err) return res.send(err);

				userModel.password = hash;
				// optional attributes
				if (req.body.firstName)
					userModel.firstName = req.body.firstName;
				if (req.body.lastName)
					userModel.lastName = req.body.lastName;
				if (req.body.roles)
					userModel.roles = req.body.roles;

				// save data to database
				userModel.save().then(() => {
					// return message and inserted data
					let newUser = _.omit(userModel._doc, ['password']);

					res.json({ 'message': 'User added successfully!', 'data': newUser});
				}).catch((err) => {
					// on error return err object
					if (err) res.send(err);
				});
			});
		});
	});

	// 'v1/countries' - create endpoint for GET (Read)
	// api.get('/', (req, res) => {
	// 	// parse URL query string (for pagination)
	// 	let page = req.query.page || 1;
	// 	let limit = req.query.limit || 10;
	// 	let sort = req.query.sort || {'name': 1};
	//
	// 	// search with aggregation using Regex()
	// 	let agg = UserModel.aggregate();
	// 	if (req.query.search) {
	// 		let search = new RegExp(`^${req.query.search}`, 'i');
	// 		agg.match( {$or :[{name: search}, {isoCodeTwo: search}, {isoCodeThree: search}]});
	// 	}
	//
	// 	// with AGGREGATE pagination (https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2)
	// 	UserModel.aggregatePaginate(agg, {"page": page, "limit": limit, "sortBy": sort} ,(err, countries, pageCount, itemCount) => {
	// 		// on error return err object
	// 		if (err) res.send(err);
	//
	// 		// return data (plural!!!)
	// 		let data = {"content": countries, "pages": pageCount, "total": itemCount, "page": page, "limit": limit};
	// 		res.json(data);
	// 	});
	// });

	// 'v1/users/:id' - Read one
	api.get('/:id', (req, res) => {
		if (req.params.id) {
			UserModel.findById(req.params.id, (err, country) => {
				// on error return err object
				if (err) res.send(err);

				// return ONE document
				res.json(country);
			});
		}
	});

	// 'v1/countries/:id - PUT (Update)
	// api.put('/:id', (req, res) => {
	// 	// create data model
	// 	let countryModel = {};
	//
	// 	// set data model values from request
	// 	// required attributes
	// 	countryModel.name = req.body.name;
	// 	countryModel.isoCodeTwo = req.body.isoCodeTwo;
	// 	countryModel.isoCodeThree = req.body.isoCodeThree;
	//
	// 	// optional attributes
	// 	if (req.body.shortListed)
	// 		countryModel.shortListed = req.body.shortListed;
	// 	if (req.body.description)
	// 		countryModel.description = req.body.description;
	// 	if (req.body.taxRate)
	// 		countryModel.taxRate = req.body.taxRate;
	// 	if (req.body.currency)
	// 		countryModel.currency = req.body.currency;
	//
	// 	// check if ID exists and its value
	// 	if (req.params.id) {
	// 		UserModel.findByIdAndUpdate(req.params.id, countryModel, {"new": true}, (err, data) => {
	// 			if (err) res.send(err);
	//
	// 			// console.log('res update', data);
	// 			res.json({message: "Update successful", "data": data});
	// 		});
	// 	}
	// });

	// '/v1/countries/:id' - DELETE (One)
	// api.delete('/:id', (req, res) => {
	// 	if (req.params.id) {
	// 		UserModel.findByIdAndDelete(req.params.id, (err, data) => {
	// 			// 	// on error return err object
	// 			if (err) res.send(err);
	//
	// 			// else return message
	// 			res.json({message: "Document deleted successfully", "data": data});
	// 		});
	// 	}
	// });

	// return api
	return api;
};