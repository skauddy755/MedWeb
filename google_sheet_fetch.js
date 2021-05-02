/*

https://developers.google.com/sheets/api/quickstart/nodejs
https://console.developers.google.com
https://developers.google.com/identity/protocols/googlescopes

*/

const fs = require("fs");
const { google } = require("googleapis");
const keys = require("./keys.json");

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]

);

client.authorize(function(err, tokens){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Connected to google API...");
        gsrun(client);
    }
    
});

async function gsrun(cl)
{
    const gsapi = google.sheets({
        version: "v4",
        auth: cl,
    });

    const opt = {
        spreadsheetId: "1RwlnjzaTcvFd8BwhJTrTtl7X0Ni4Nqw8c5LNUq2f4DI",
        range: 'Data!A1:B5'
    };
    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data);
}