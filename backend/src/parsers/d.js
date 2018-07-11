const dush = require('dush');
const emitter = dush();

emitter
    .on('hi', (place) => {
        console.log(`hello ${place}!`) // => 'hello world!'
    })
    .on('hi', (place) => {
        console.log(`hi ${place}, yeah!`) // => 'hi world, yeah!'
    })

emitter.emit('hi', 'world');

console.log(emitter._allEvents) // => {}
