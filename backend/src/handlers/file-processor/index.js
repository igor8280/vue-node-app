import Watcher from '../watcher';
import Importer from '../importer';
import Parsers from '../parsers';

import emitter from '../event-emitter';

class FileProcessor {
	constructor(watchPath) {
		this.parsers = new Parsers();
		this.watchPath = watchPath;
	}

	// create new Watcher instance; start watch process
	startFileWatcher() {
		let watcher = new Watcher(this.watchPath);
		watcher.watch();
	}

	// create new Importer instance
	setImporter() {
		let importer = new Importer();

		// All file processing events
		emitter.onEvent(emitter.events.IMPORT, (data) => {
			console.log('data', data);
			// read data from file (only xls for now). Importer will be augmented
			let jsonData = importer.readFile(data.filePath);

			// get 'correct' parser based on event name
			this.parsers.getParser(emitter.events[data.eventName]).then(parser => {
				console.log('parser', parser);
				parser.parseJson();
			}).catch(error => {
				console.log('errorrrrrrrrr', error);
			});
			// let parser = this.parsers.getParser(emitter.events[data.eventName]);
			//
			// if (parser.error) {
			// 	// error handler for parser
			// 	console.log('parser', parser);
			// 	return parser;
			// }
			// else
			// 	parser.parseJson(jsonData); // do parsing
		});
	}

	// simplification for file processing setup
	setup() {
		this.startFileWatcher();
		this.setImporter();
	}
}

export default FileProcessor;