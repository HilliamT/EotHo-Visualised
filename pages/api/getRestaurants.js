import csv from "csvtojson";
import axios from "axios";
import cache from "memory-cache";

const postcode_to_longlat = require('../../preprocessing/postcode_to_longlat.json');


export default async (req, res) => {
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
}