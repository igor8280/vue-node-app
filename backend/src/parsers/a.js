var EventEmitter = require('events').EventEmitter;
var foxlife = require('./foxlife');


var myEmitter = new EventEmitter();

myEmitter.on('print', (arg) => {
    console.log(arg);
});
myEmitter.on('foxlife', (arg) => {
    console.log(arg);
    foxlife(arg);
});

exports.myEmitter = myEmitter;