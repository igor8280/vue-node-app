import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import { authenticate } from './middleware/authMiddleware';

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
		docExpansion : "none"
	}
}));

// auth middleware
app.use((req, res, next) => {
	if (req.originalUrl === '/v1/auth/login')
		next();
	else
		authenticate(req, res, next);
});

// api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
