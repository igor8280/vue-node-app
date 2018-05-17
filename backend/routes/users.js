const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../app/models/users');

mongoose.connect('mongodb://localhost:27017/testCollection');
/* GET users listing. */
router.route('/')

	.post((req, res) => {
		let user = new User();
		user.name = req.body.name;
		user.lastName = req.body.lastName;
		user.phone = req.body.phone;

		user.save(err => {
			if (err) res.send(err);
			res.json({message: 'User created successfully!'});
		});
	})

	.get( (req, res) => {
		User.find((err, users) => {
			if (err) res.send(err);
  			res.json(users);
		});
	});

router.route('/:id')
	.get((req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) res.send(err);
			res.json(user);
		});
	});

module.exports = router;
