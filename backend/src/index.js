import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// import fs from 'fs';

// process.on('uncaughtException', (err) => {
// 	console.log('Name: ', err.name);
// 	console.log('Message: ', err.message);
// 	// console.log('Stack: ', err.stack);
//
// 	let date = new Date();
//
// 	let log = date.toLocaleDateString('sr') + ' ' + date.toLocaleTimeString('sr') + '\n';
// 	log += err.stack + '\n';
//
// 	fs.appendFileSync(__dirname + '/logs/exceptions.log', log, (err) => {
// 		console.log(err);
// 	});
// });

// throw new Error('x');

import FileProcessor from './handlers/file-processor';

import { setHeaders } from './middlewares/authMiddleware';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger';

import config from './config';
import routes from './routes';

// setup file processing
const fileProcessor = new FileProcessor(path.join(__dirname, 'public/epg'));
fileProcessor.setup();

let app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyParser.json({
	limit: config.bodyLimit
}));


// middleware for serving static files
app.use(express.static(path.join(__dirname, 'public/images'), config.pathPublicImages));
app.use(express.static(path.join(__dirname, 'public/epg'), config.pathPublicEpg));

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
	swaggerOptions: {
		docExpansion : "none",
		onComplete() {
			this.ui.preauthorizeApiKey('api_key', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTMxMzE2MTM1LCJleHAiOjE1NjI4NTIxMzV9.W4neYRfcNN1xQLHByT9EfGtIGpBAvfs1YvkigWLPArk');
		}
	}
}));

// set response headers
app.use(setHeaders);

// api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
