const dush = require('dush');
const emitter = dush();


console.log(emitter._allEvents) // => {}
console.log(emitter.on) // => Function
console.log(emitter.once) // => Function
console.log(emitter.off) // => Function
console.log(emitter.emit) // => Function