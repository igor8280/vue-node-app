const http = require('http');
const Watcher = require('./file');

const watcher = new Watcher(__dirname + '/file/watch');
watcher.watch();

let server = http.createServer();
server.listen(3069);

console.log('Server listents on 3069');