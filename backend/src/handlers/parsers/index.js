import FoxCrime from './fox_crime';
import Parser1 from './parser1';
import Parser2 from './parser2';

class Parsers {
	constructor() {}
	
	getParser(name) {
		switch (name) {
			case 'fox_crime':
				return new FoxCrime();
			case 'parser1':
				return new Parser1();
			case 'parser2':
				return new Parser2();
			default:
				return {'error': true, code: 500, 'message': `There is no parser with name '${name}'`};
		}
	}
}

export default Parsers;