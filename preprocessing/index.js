const csv = require('csv-parser');
const fs = require("fs");

const OUTPUT_FILE = "./postcode_to_longlat.json";
let first = true;

fs.appendFile(OUTPUT_FILE, "{", () => { })
fs.createReadStream("./open_postcode_geo.csv")
    .pipe(csv({
        headers:
            [
                "postcode", "status", "size", "a", "b", "c", "country",
                "longitude", "latitude", "postcode_shortened", "postcode_extended",
                "postcode__extended", "postcode_regional", "postcode_regional_2",
                "postcode_regional_3", "postcode_regional_4", "postcode_zip"
            ],
        options: {
            escape: ","
        },
    }))
    .on('data', function ({ postcode, latitude, longitude }) {
        console.log(postcode);
        let output = `${(first ? "" : ",")}\n\t"${postcode}": ${JSON.stringify({ longitude, latitude })}`;
        first = false;
        fs.appendFile(OUTPUT_FILE, output, () => { });
    })
    .on('end', function () {
        fs.appendFile(OUTPUT_FILE, "\n}", () => { });
        console.log('Data loaded');
    });
