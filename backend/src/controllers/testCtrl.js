import mongoose from 'mongoose';
import { Router } from 'express';
import TestModel from '../models/testModel';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// 'v1/testApi/add' - creating endpoint
	api.post('/add', (req, res) => {
		// create data model
		let testModel = new TestModel();

		// set data model values from request
		testModel.name = req.body.name;

		// custom validation

		// save data to database
		testModel.save(err => {
			// on error return err object
			if (err) res.send(err);

			// else return message
			res.json({ message: 'TestModel saved successfully!'});
		});

	});

	// return api
	return api;
};