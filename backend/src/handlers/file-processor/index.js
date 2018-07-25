import Watcher from '../watcher';
import Importer from '../importer';
import Parsers from '../parsers';

import emitter from '../event-emitter';
import events from '../event-emitter/config.events';

class FileProcessor {
	constructor() {}

	startFileWatcher(path) {
		// create new Watcher instance; start watch process
		let watcher = new Watcher(path);
		watcher.watch();
	}

	setImporter() {
		// create new Importer instance
		let importer = new Importer();

		// All file processing events
		emitter.onEvent(events.IMPORT, (data) => {
			let jsonData = importer.readFile(data.filePath);
			// console.log('json', json);
			console.log('json from file-proc', data);
			emitter.emitEvent(events[data.eventName], jsonData);
			// let json = {
			// 	'parserName': data.eventName.toLowerCase(),
			// 	'json': jsonData
			// };
			//
			// emitter.emitEvent(events.PARSE_DATA, json);
		});
	}

	// include parsers
	setParsers() {
		let parsers = new Parsers();
		parsers.setParsersEvents();
	}
}

export default FileProcessor;