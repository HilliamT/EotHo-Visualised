import csv from "csvtojson";
import axios from "axios";
import PostcodesIO from "postcodesio-client";
let postcodes = new PostcodesIO();

export default async (req, res) => {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    let { data } = await axios.get("https://raw.githubusercontent.com/hmrc/eat-out-to-help-out-establishments/master/data/participating-establishments/restaurants.csv");

    let restaurants = [];
    let d;

    for (let restaurant of (await csv().fromString(data)).slice(0, 1000)) {
        try {
            d = restaurant;

            // check if postcode is in correct format, otherwise, format (All postcodes have second half contains 3 characters)
            let { Postcode } = restaurant;
            let { length } = Postcode;
            if (!Postcode.includes(" ")) {
                Postcode = Postcode.substring(0, length - 3) + " " + Postcode.substring(length - 3, length);
            }
            Postcode = Postcode.toUppercase();

            console.log(Postcode);

            let { latitude, longitude } = await postcodes.lookupPostcode(Postcode);
            restaurants.push({ ...restaurant, latitude, longitude });
        } catch (err) {
            console.log(err);
            console.log(d);
        }
    }

    res.status(200).send(restaurants);
}