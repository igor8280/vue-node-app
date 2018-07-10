import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger';
import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';

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
	if (req.headers.authorization) {
		let access_token = req.headers.authorization.split(' ')[1];

		try {
			jwt.verify(access_token, config.salt.access_token);
			next();
		} catch (e) {
			let custom = {
				'error': 'invalid_token',
				'error_description': 'Access token expired:' + access_token
			};
			let error = 'error ' + custom.error + ' error_description ' + custom.error_description;

			res.append('WWW-Authenticate', error);
			res.append('Cache-Control', 'no-store');
			res.append('Pragma', 'no-cache');
			res.status(401).send(custom);
		}
	// 	jwt.verify(access_token, config.salt.access_token, (err, decode) => {
	// 		if (err) {
	// 			console.log('err', err);
	// 			let custom = {
	// 				'error': 'invalid_token',
	// 				'error_description': 'Access token expired!'
	// 			};
	// 			res.status(401).send(custom);
	// 		}
	//
	// 		// next();
	// 	});
	} else {
		res.send('No Authorization header!');
		// next();
	}
});

// passport config

// api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
