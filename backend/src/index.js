import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import { setHeaders } from './middleware/authMiddleware';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger';

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyParser.json({
	limit: config.bodyLimit
}));

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
