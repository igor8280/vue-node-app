module.exports = function (fileUploadPath) {
    let xlsFolder = fileUploadPath;

    let XLSX = require('xlsx');

    let json_object = new Object();

    let workbook = XLSX.readFile(xlsFolder, {type: 'binary'});
    workbook.SheetNames.forEach(function (sheetName) {
        // podaci iz sheet-a
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        // pravi se glavni objecat na osnovu imena sheet-a
        json_object[sheetName] = XL_row_object;
    });

    return json_object;
};