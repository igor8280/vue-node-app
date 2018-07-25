import EventEmitter from 'events';

class Events extends EventEmitter {
	constructor () {
		super();
		// console.log('constructor', this);
	}

	emitEvent(event, data) {
		this.emit(event, data);
	}
	onEvent(event, cb) {
		this.on(event, cb);
	}
}

const events = new Events();

export default events;