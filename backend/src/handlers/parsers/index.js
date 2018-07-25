import emitter from '../event-emitter';
import events from '../event-emitter/config.events';

import foxCrime from './fox_crime';
// import fox_crime from './fox_crime';
import Parser1 from './parser1';
import Parser2 from './parser2';

// let fox_crime = new FoxCrime();
// console.log('sdffdsafadsfadsdsfa', FoxCrime);
class Parsers {
	constructor() {}
	
	setParsersEvents() {
		emitter.onEvent(events.FOX_CRIME, foxCrime.parseJson); // OVO RADI
		// emitter.onEvent(events.PARSE_DATA, this.callParser);
	}
	//
	// callParser(data) {
	// 	console.log('data from parsers/index', data.parserName);
	// 	let fun = data.parserName + '.parseJson';
	// 	let test = Function(fun);
	// 	console.log('test', test);
	// 	test().bind(fox_crime);
	// }
}

export default Parsers;