var emitter = require('./a');
var printEmitter = emitter.myEmitter;

printEmitter.emit('print', 'how was Dunkirk?');
printEmitter.emit('print', 'Dunkirk was awesome!!');