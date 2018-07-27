class Parsers {
	constructor() {}

	getParser(name) {
		if (name) {
			return import('./fox_crime/index.js').then(module => {
				return new module.default();
			}).catch(err => {
				console.log('error', err);
			});
		}
	}
}

export default Parsers;
