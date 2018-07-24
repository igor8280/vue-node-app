// IMPORTANT first install GraphicsMagick on your system http://www.graphicsmagick.org/
const path = require('path');
const gm = require('gm');

/**
 * resize image
 * @param {Object} options
 * 	{
 * 	// required options
 * 		{String} path - absolute path of image
 * 		{Number} width
 * 		{Number} height
 * 	// optional options
 * 		{Boolean} ignoreAspect default false
 * 		{Boolean} exact resize image to desired dimension
 * 		{String} output absolute path dir/name.ext
 * 		{String} outputPath image will be saved in this path
 * 		{String} outputName image will be saved in source path with this name
 * 	}
 * @returns {Promise<any>}
 */
const resize = (options) => {
	return new Promise((resolve, reject) => {
		let dir = path.dirname(options.path) + '/';
		let ext = path.extname(options.path);
		let name = path.basename(options.path, ext);
		let outputName = name + '_' + options.width + 'x' + options.height + ext;
		let img = gm(options.path);

		if (options.ignoreAspect === true)
			img.resize(options.width, options.height, '!');
		else if (options.exact === true)
			img.resizeExact(options.width, options.height);
		else
			img.resize(options.width, options.height);


		let output = dir + outputName;

		if (options.hasOwnProperty('output'))
			output = options.output;
		else if (options.hasOwnProperty('outputPath'))
			output = options.outputPath + outputName;
		else if (options.hasOwnProperty('outputName'))
			output = dir + options.outputName;

		img.write(output, (err) => {
			if (!err)
				resolve(output);
			else
				reject(err);
		});
	});
};

export default {
	resize
};
