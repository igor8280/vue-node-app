const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../src/config');

let data = {
	id: 123
};

const salt_access = config.salt.access_token;
const salt_refresh = config.salt.refresh_token;
console.log('salt_access', salt_access);
console.log('salt_refresh', salt_refresh);

let access_token = jwt.sign(data, salt_access, { expiresIn: 1 });

let refresh_token = jwt.sign(data, salt_refresh);

console.log('access_token', access_token);

console.log('refresh_token', refresh_token);

setTimeout(() => {
	let isVerified = jwt.verify(access_token, salt_access);
	console.log('isVerified', isVerified);
}, 2000);

