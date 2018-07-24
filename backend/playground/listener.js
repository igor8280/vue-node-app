let events = require('./event-emitter');
// let events = new Events();
console.log('listener', events);
// const testFn = (data) => console.log(data);
const listener = () => {
	events.onEvent('test', (data) => console.log(data));
};

module.exports = listener;