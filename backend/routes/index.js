const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ title: 'Express' });
});

router.use('/users', usersRouter);

module.exports = router;
