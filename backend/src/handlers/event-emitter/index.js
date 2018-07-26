import EventEmitter from 'events';
import events from './events';

class Emitter extends EventEmitter {
	constructor () {
		super();
		this.events = events;
	}

	emitEvent(event, data) {
		this.emit(event, data);
	}
	onEvent(event, cb) {
		this.on(event, cb);
	}
}

// by creating an instance before exporting it,
// we make sure that this is the only instance (singletone)
const emitter = new Emitter();

export default emitter;