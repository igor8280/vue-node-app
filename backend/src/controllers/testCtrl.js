// import mongoose from 'mongoose';
import { Router } from 'express';
import TestModel from '../models/testModel';

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// CRUD - Create Read Update Delete

	// 'v1/testApi/add' - creating endpoint for POST (Create)
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

			let data = req.body;
			data._id = testModel._id;
			// else return message
			res.json({ message: 'TestModel saved successfully!', "data": data});
		});
	});

	// 'v1/testApi' - create endpoint for GET (Read)
	api.get('/', (req, res) => {
		TestModel.find({}, (err, testDatas) => {
			// on error return err object
			if (err) res.send(err);

			// return data (plural!!!)
			res.json(testDatas);
		});
	});

	// 'v1/testApi/:id' - Read one
	api.get('/:id', (req, res) => {
		TestModel.findById(req.params.id, (err, testData) => {
			// on error return err object
			if (err) res.send(err);

			// return ONE document
			res.json(testData);
		});
	});

	// 'v1/testApi/:id - PUT (Update)
	api.put('/:id', (req, res) => {
		// check if ID exists and its value
		// if (req.params.id)
		// TestModel.findById(req.params.id, (err, testData) => {
		// 	if (err) res.send(err);
		// 	//  update data object from response
		// 	testData.name = req.body.name;
		//
		// 	// save to database
		// 	testData.save(err => {
		// 		// on error return err object
		// 		if (err) res.send(err);
		//
		// 		// else return message
		// 		res.json({ message: "TestModel updated successfully" });
		// 	});
		// });


		//
		TestModel.findByIdAndUpdate(req.params.id, {"name": req.body.name}, {"new": true}, (err, data) => {
			if (err) res.send(err);

			// console.log('res update', data);
			res.json({message: "Update successful", "data": data});
		});

	});

	// '/v1/testApi/:id' - DELETE (One)
	api.delete('/:id', (req, res) => {
		// if (req.params.id)
		// TestModel.remove({_id: req.params.id}, (err, data) => {
		// 	// on error return err object
		// 	if (err) res.send(err);
		//
		// 	// else return message
		// 	res.json({ message: "Deletion successful"});
		// });
		TestModel.findByIdAndDelete(req.params.id, (err, data) => {
			// 	// on error return err object
			if (err) res.send(err);

			// else return message
			res.json({message: "Document deleted successfully", "data": data});
		});
	});

	// return api
	return api;
};