import winston, { format } from 'winston';

const dir = __dirname + '/../../logs/';

const Logger = level => {
	/**
	 * error log in format {name: ErrorName, message: ErrorMessage}
	 */
	let logFormat = format.printf(data => {
		let date = new Date();
		let year = date.getFullYear();
		let month = ('0' + (date.getMonth()+1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let hour = ('0' + date.getHours()).slice(-2);
		let minut = ('0' + date.getMinutes()).slice(-2);
		let second = ('0' + date.getSeconds()).slice(-2);
		let timestamp = `${day}/${month}/${year} ${hour}:${minut}:${second}`;

		return `${timestamp} [${data.name}]: ${data.message}`;
	});

	return winston.createLogger({
		level,
		format: logFormat,
		transports: [
			new winston.transports.File({
				dirname: dir,
				filename: level + '.log',
				level
			}),
			new winston.transports.Console()
		]
	});
};

const error = Logger('error');
const warn = Logger('warn');
const info = Logger('info');

winston.exceptions.handle(
	new winston.transports.File({ filename: dir + 'exceptions.log' })
);

export default {
	error: error.error,
	warn: warn.warn,
	info: info.info
};
