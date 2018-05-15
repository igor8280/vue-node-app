const mongoose = require('mongoose');


function test() {
	mongoose.connect('mongodb://localhost:27017/testCollection');
	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		// we're connected!
		console.log('connected');
	});
	console.log('igor');
};

module.exports = test;
