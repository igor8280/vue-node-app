const express = require('express');
const router = express.Router();
const test = require('../public/javascripts/users');

/* GET users listing. */
router.get('/', (req, res, next) => {
	test();
  	res.send('respond with a resource - test');
});

router.get('/:id', (req, res, next) => {
	res.json({ params: req.params });
});
module.exports = router;
