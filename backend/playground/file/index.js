const path = require('path');
const watcher = require('node-watch');
const emitter = require('../event-emitter');
const config = require('./events/config');

console.log('config', config);

class FileWatcher {
	constructor(dirFile) {
		this.folderFile = dirFile;
	};

	watch() {
		watcher(this.folderFile, {recursive: true}, (event, filename) => {
			console.log('event', event, filename.toUpperCase());
			let fileName = path.parse(filename).name.toUpperCase();
			console.log('fileName', fileName);
			if (filename && config[fileName]) {
				console.log('filename', filename);
				console.log('config[filename]', config[filename]);
				emitter.emitEvent(config[filename], filename);
			}
			else
				console.log('no directory or file');
		});
	};
}

module.exports = FileWatcher;