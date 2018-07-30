import winston, { format } from 'winston';

const Logger = level => {
	let dir = __dirname + '/../logs/';

	let logFormat = format.printf(data => {
		console.log('WINSTON', typeof data);

		let date = new Date();
		let year = date.getFullYear();
		let month = ('0' + (date.getMonth()+1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let hour = ('0' + date.getHours()).slice(-2);
		let minut = ('0' + date.getMinutes()).slice(-2);
		let second = ('0' + date.getMinutes()).slice(-2);
		let timestamp = `${day}/${month}/${year} ${hour}:${minut}:${second}`;

		return `${timestamp} [${data.name}]: ${data.message}`;
	});

	return winston.createLogger({
		level,
		timestamp: true,
		format: logFormat,
		transports: [
			new winston.transports.File({
				dirname: dir,
				filename: level + '.log',
				level
			})
		]
	});
};

const error = Logger('error');
const warn = Logger('warn');
const info = Logger('info');

export default {
	error: error.error,
	warn: warn.warn,
	info: info.info
};
