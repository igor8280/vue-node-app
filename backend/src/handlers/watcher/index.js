import path from 'path';
import watcher from 'node-watch';
import emitter from '../event-emitter/';
import config from '../event-emitter/config.events';

// console.log('config', config);

class FileWatcher {
	constructor(dirFile) {
		this.folderFile = dirFile;
	};

	getDir(dirPathString) {
		let dirPath = path.parse(dirPathString).dir;
		let curDir = dirPath.split('/').pop();
		return curDir.toUpperCase();
	}

	watch() {
		watcher(this.folderFile, {recursive: true}, (event, filePath) => {
			if (event === 'update') {
				// console.log('event', event, filePath);
				let eventName = this.getDir(filePath);
				console.log('eventName', eventName);
				if (filePath && config[eventName]) {
					// console.log('filePath', filePath);
					// console.log('config[eventName]', config[eventName]);
					emitter.emitEvent(config.IMPORT, filePath);
				}
				else
					console.log('No directory or file!');
			}
		});
	};
}

module.exports = FileWatcher;