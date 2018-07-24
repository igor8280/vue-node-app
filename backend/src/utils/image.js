const path = require('path');
const sharp = require('sharp');

/**
 *
 * @param {Object} options
 * {
 * 		{String} path - absolute path of image
 * 		{Number} width - omit this option to auto-scale width
 * 		{Number} height - omit this option to auto-scale height
 * 		{Boolean} ignoreAspect - stretch the image to the exact width and/or height
 * 		{String} output - absolute path for output dir/name.ext
 * 		{String} outputDir - dir where to save resized image
 * 		{String} outputName - name for resized image
 * }
 * @returns {Promise<any>}
 */
const resize = options => {
	return new Promise((resolve, reject) => {
		let dir = path.dirname(options.path) + '/';
		let ext = path.extname(options.path);
		let name = path.basename(options.path, ext);
		let width = options.width || null;
		let height = options.height || null;
		let outputName = name + '_' + (width || 'auto') + 'x' + (height || 'auto') + ext;

		let img = sharp(options.path);

		img.resize(options.width, options.height);

		if (options.ignoreAspect === true)
			img.ignoreAspectRatio();

		let output = dir + outputName;
		if (options.hasOwnProperty('output'))
			output = options.output;
		else if (options.hasOwnProperty('outputDir'))
			output = options.outputDir + outputName;
		else if (options.hasOwnProperty('outputName'))
			output = dir + options.outputName;

		img.toFile(output, err => {
			if (err)
				reject(err);
			else
				resolve(output);
		});
	});
};

export default {
	resize
};
