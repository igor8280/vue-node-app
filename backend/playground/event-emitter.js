const EventEmitter = require('events');

class Events extends EventEmitter {
	constructor () {
		super();
		console.log('constructor', this);
	}

	emitEvent(event, data) {
		this.emit(event, data);
	}
	onEvent(event, data) {
		this.on(event, data);
	}
};

const events = new Events();

module.exports = events;