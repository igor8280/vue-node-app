// var fs = require('fs');
// var mv = require('mv');
var path = require('path'); // https://nodejs.org/api/path.html
var watch = require('node-watch'); // https://www.npmjs.com/package/node-watch

var importFile = require('./importFile');
var fox_life = require('./fox_life');


var xlsFolder = '../import';


// gleda nove fajlove u folderu
watch(xlsFolder, {recursive: true}, function (evt, name) {
    if (evt === 'update') {
        // Podaci u izmenjenom fajlu
        let ime_fajla = path.basename(name);
        let ekstenzija = path.extname(ime_fajla);
        let folder_fajla = path.dirname(name).split(path.sep).pop();

        // Da li fajl odgovara extenziji
        if (ekstenzija === '.xlsx' || ekstenzija === '.xls') {
            console.clear();
            // console.log('ime fajla:', ime_fajla);
            // console.log('ekstenzija:', ekstenzija);
            // console.log('folder fajla:', folder_fajla);

            // Ucitava se fajl
            let jsonData = importFile(name);

            fox_life(jsonData);
            // console.log(JSON.stringify(jsonData));
        }
    }
    if (evt === 'remove') {
        // console.log('remove ', name);
    }
});











/*
// Parsira xls
var workbook = XLSX.readFile("a.xlsx", {type: 'binary'});
workbook.SheetNames.forEach(function (sheetName) {
    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    var json_object = XL_row_object;
    // console.log(sheetName);
    // console.log(json_object);
});


// lisa sve fajlove u folderu
fs.readdir(xlsFolder, (err, files) => {
    files.forEach(file => {
        // pomera u drugi folder
        mv(xlsFolder + '/' + file, donXlsFolder + '/' + file, () => {});
    });
});

*/
