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
			console.log('data123', data);
			// read data from file (only xls for now). Importer will be augmented
			importer.readFile(data.filePath).then(jsonData => {
				// get 'correct' parser based on event name
				this.parsers.getParser(emitter.events[data.eventName]).then(parser => {
					console.log('parser', parser);
					parser.parseJson(jsonData);
				}).catch(error => {
					console.log('errorrrrrrrrr', error);
				});
			}).catch(error => {
				console.log('Error reading file: ', error.message);
			});
		});
	}

	// simplification for file processing setup
	setup() {
		this.startFileWatcher();
		this.setImporter();
	}
}

export default FileProcessor;
