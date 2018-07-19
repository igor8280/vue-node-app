const http = require('http');
const express = require('express');
const config = require('../src/config');

let app = express();
app.server = http.createServer(app);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

module.exports = app;
