const Parser1 = require('./parser1');
const Parser2 = require('./parser2');
const Parser3 = require('./parser3');

const parser1 = new Parser1();
const parser2 = new Parser2();
const parser3 = new Parser3();

module.exports = {
	parser1,
	parser2,
	parser3
};

