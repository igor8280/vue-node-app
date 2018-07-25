import path from 'path';
import watcher from 'node-watch';
import emitter from '../event-emitter/';
import events from '../event-emitter/config.events';

// console.log('config', config);

class Watcher {
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
			if (event === 'update') {
				// console.log('event', event, filePath);
				let eventName = this.getDir(filePath).toUpperCase();
				// console.log('eventName', eventName);
				if (filePath && events[eventName]) {
					// create data object with file path and event name
					let data = {
						filePath,
						eventName
					};
					// console.log('filePath', filePath);
					// console.log('config[eventName]', config[eventName]);
					emitter.emitEvent(events.IMPORT, data);
				}
				else
					console.log('No directory or file!');
			}
		});
	};
}

export default Watcher;