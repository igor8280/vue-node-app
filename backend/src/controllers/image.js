import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import response from '../utils/response';
import image from '../utils/image';

let imagesPath = __dirname +  '/../public/images/original/';
let maxFileSize = 1024 * 1024;	// 1mb
let allowedMimeTypes = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/gif': 'gif',
	'image/bmp': 'bmp',
	'image/svg+xml': 'svg'
};

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, imagesPath)
	},
	filename: (req, file, cb) => {
		let currentExt = path.extname(file.originalname);
		let name = Date.now() + '_';
		name += path.basename(file.originalname, currentExt);
		name += '.' + allowedMimeTypes[file.mimetype];
		cb(null, name);
	}
});

let upload = multer({
	storage,
	fileFilter(req, file, cb) {
		if (allowedMimeTypes.hasOwnProperty(file.mimetype))
			cb(null, true);
		else
			cb({code: 'FileType'});
	},
	limits: {
		fileSize: maxFileSize
	}
}).single('image');

export default ({ config, db }) => {
	// instance of express router
	let api = Router();

	// endpoint for image upload
	api.post('/', (req, res) => {
		upload(req, res, err => {
			if (err) {
				switch (err.code) {
					case 'LIMIT_FILE_SIZE':
						return response.error.FileSizeLimit(res, '1mb');
					case 'FileType':
						return response.error.FileType(res, Object.values(allowedMimeTypes).join(', '));
					default:
						response.sendError(response.defaultErrors.badRequest, res);
				}
			}
			else {
				image.resize({
					path: imagesPath + req.file.filename,
					width: 640,
					height: 480,
					ignoreAspect: true,
					output: imagesPath + '../resize/640x480/' + req.file.filename
				}).then(info => {
					console.log(info);
				});
				response.success.upload(req.file.filename, res);
			}
		});
	});

	// return api
	return api;
};
