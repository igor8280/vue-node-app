import _ from 'lodash';
import path from 'path';
import watcher from 'node-watch';
import emitter from '../event-emitter/';
import Logger from '../error';

// console.log('config', config);

class FileWatcher {
	constructor(dirFile) {
		this.folderFile = dirFile;
	};

	getDir(dirPathString) {
		if (!dirPathString)
			return;

		let dirPath = path.parse(dirPathString).dir;
		let curDir = dirPath.split('/').pop();
		return curDir.toUpperCase();
	}

	watch() {
		watcher(this.folderFile, {recursive: true}, (event, filePath) => {
			// console.log('event', event);
			if (event === 'update') {
				let eventName = this.getDir(filePath).toUpperCase();
				// console.log('eventName', eventName);

				if (filePath && _.isUndefined(emitter.events[eventName]) === false ) {
					// create data object with file path and event name
					let data = {
						filePath,
						eventName
					};
					emitter.emitEvent(emitter.events.IMPORT, data);
				}
				else {
					// should be an Error handler...
					let error = {'file': 'handlers/watcher/index.js', 'function': 'watch()', 'message': 'Event not found!', 'eventName': eventName};
					Logger.error(new Error(JSON.stringify(error)));
					// console.log('No directory or file!', error);
					// return error;
				}
			}
		});
	};
}

export default FileWatcher;
