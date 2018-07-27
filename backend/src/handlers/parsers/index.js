import FoxCrime from './fox_crime';
import Parser1 from './parser1';
import Parser2 from './parser2';

class Parsers {
	constructor() {}

	// getParser(name) {
	// 	if (name) {
	// 		return import('./fox_crime/index.js').then(module => {
	// 			console.log('module', module);
	// 			return new module();
	// 		}).catch(err => {
	// 			console.log('eeeeeerrrrrrroooooorrrrrrr', err);
	// 		});
	// 	}
	// }
	
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