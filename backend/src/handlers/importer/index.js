import path from 'path';
import fs from 'fs';

import xlsx from 'xlsx';
import xml from 'fast-xml-parser';
import html from 'cheerio';

class FileImporter {
	constructor() {
		this.parsedJson = {};
	}

	readFile(filepath) {
		if (!filepath)
			return;

		let ext = path.extname(filepath);

		switch (ext) {
			case '.xls':
			case '.xlsx':
				return this.parseXls(filepath);
			case '.xml':
				return this.parseXml(filepath);
			case '.html':
			case '.htm':
				return this.parseHtml(filepath);
		}
	}

	parseXls(filepath) {
		return new Promise(resolve => {
			let worksheet = xlsx.readFile(filepath, {type: 'binary'});

			worksheet.SheetNames.forEach(sheetName => {
				// worksheet data
				let sheetRow = xlsx.utils.sheet_to_row_object_array(worksheet.Sheets[sheetName]);
				// create JSON
				this.parsedJson[sheetName] = sheetRow;
			});

			// return data
			return resolve(this.parsedJson);
		});
	}

	parseXml(filepath) {
		return new Promise((resolve, reject) => {
			fs.readFile(filepath, 'UTF-8', (err, data) => {
				if (err)
					return reject(err);

				if (xml.validate(data) === true) {
					this.parsedJson = xml.parse(data, {
						ignoreAttributes : false,
						attributeNamePrefix : '$'
					});

					return resolve(this.parsedJson);
				}
				else
					return reject(new Error('Invalid XML Format!'));
			});
		});
	}

	parseHtml(filepath) {
		return new Promise((resolve, reject) => {
			fs.readFile(filepath, 'UTF-8', (err, data) => {
				if (err)
					return reject(err);

				return resolve(html.load(data));
			});
		});
	}
}

export default FileImporter;
