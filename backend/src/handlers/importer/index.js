import xlsx from 'xlsx';

class FileImporter {
	constructor() {
		this.parsedJson = {};
	}

	readFile(filepath) {
		if (!filepath)
			return;

		let worksheet = xlsx.readFile(filepath, {type: 'binary'});

		worksheet.SheetNames.forEach(sheetName => {
			// worksheet data
			let sheetRow = xlsx.utils.sheet_to_row_object_array(worksheet.Sheets[sheetName]);
			// create JSON
			this.parsedJson[sheetName] = sheetRow;
		});

		// return data
		return this.parsedJson;
	}
}

export default FileImporter;