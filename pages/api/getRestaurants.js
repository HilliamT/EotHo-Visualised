import csv from "csvtojson";
import axios from "axios";
import cache from "memory-cache";
import postcodes from "node-postcodes.io"

const postcode_to_longlat = require('../../preprocessing/postcode_to_longlat.json');

export default async (req, res) => {
    let { result } = await postcodes.geo(51.50350519362193, -0.06000660302581952);
    if (result.length == 0) return res.status(400).send({ error: "Not enough results" });
    console.log(result[0].postcode);

    /*
    const value = cache.get("restaurants");

    if (value) {
        return res.status(200).send(value);
    }

    let { data } = await axios.get("https://raw.githubusercontent.com/hmrc/eat-out-to-help-out-establishments/master/data/participating-establishments/restaurants.csv");
    let restaurants = await csv().fromString(data);


    restaurants = restaurants.slice(0, 50).map((restaurant) => {
        let { Postcode } = restaurant;
        let { length } = Postcode;
        if (!Postcode.includes(" ")) {
            Postcode = Postcode.substring(0, length - 3) + " " + Postcode.substring(length - 3, length);
        }
        Postcode = Postcode.toUpperCase();

        console.log(Postcode);

        let { latitude, longitude } = postcode_to_longlat[Postcode] ? postcode_to_longlat[Postcode] : { longitude: "51.000", latitude: "0.000" };
        //restaurants.push({ ...restaurant, latitude, longitude });
        return { ...restaurant, latitude, longitude };
    });
    

    res.status(200).send(restaurants);
    */

    res.status(200).send({ results });
}