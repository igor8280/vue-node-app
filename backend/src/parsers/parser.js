module.exports = function (fileUploadPath, fileName) {
    let xlsFolder = fileUploadPath;

    let XLSX = require('xlsx');

    let workbook = XLSX.readFile(xlsFolder + '/' + fileName, {type: 'binary'});
    workbook.SheetNames.forEach(function (sheetName) {
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        let json_object = XL_row_object;
        console.log(sheetName);
    });
};