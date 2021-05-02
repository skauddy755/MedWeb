const keys = require("./keys.json");
const { GoogleSpreadsheet } = require('google-spreadsheet');

(async function() {
    await someAsyncFunction();
}());


async function someAsyncFunction()
{
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1xr84SvxOeGoIFnZSrZNWYprbHGtp0HUDQRk155oyKMU');

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: keys.client_email,
      private_key: keys.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    let oxygen = [];
    doc.sheetsByIndex.forEach(async function(value, index) {
        
        const sheet = doc.sheetsByIndex[index]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        // console.log(sheet.title);
        // console.log(sheet.rowCount);

        // await sheet.loadCells('A1:E10'); // loads a range of cells
        // console.log(sheet.cellStats); // total cells, loaded, how many non-empty
        // console.log(sheet.rowCount);
        // const a1 = sheet.getCell(0, 0); // access cells using a zero-based index
        // const c6 = sheet.getCellByA1('C6'); // or A1 style notation
        // // access everything about the cell
        // console.log(a1.value);
        // console.log(a1.formula);
        // console.log(a1.formattedValue);


        await sheet.loadCells('A4:H4');
        const cellA1 = sheet.getCell(0, 3);
        console.log(cellA1);
    });
}