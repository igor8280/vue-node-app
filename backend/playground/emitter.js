let events = require('./event-emitter');

// let listener = require('./listener');
// listener();
// let events = new Events();
console.log('emitter', events);

// const emit = () => {
	events.emitEvent('test', 'igor');
// };

// module.exports = events;