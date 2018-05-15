const express = require('express');
const router = express.Router();
const User = require('../app/models/users');

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
  			res.JSON(users);
		});
	});

router.get('/:id')

	.get((req, res) => {
		User.findById(req.params.id, (err, user) => {
			if (err) res.send(err);
			res.json(user);
		});
	});
// router.get('/:id', (req, res, next) => {
// 	res.json({ params: req.params });
// });
module.exports = router;
