import csv from "csvtojson";
import axios from "axios";
import cache from "memory-cache";
import postcodes from "node-postcodes.io";

const postcode_to_longlat = require('../../preprocessing/postcode_to_longlat.json');

export default async (req, res) => {
    let { result } = await postcodes.geo(51.50350519362193, -0.06000660302581952);
    if (result.length == 0) return res.status(400).send({ error: "Not enough results" });
    console.log(result[0].postcode);

    let restaurants = [];
    let { data } = await axios.get(`https://www.tax.service.gov.uk/eat-out-to-help-out/find-a-restaurant/results?lookup=${encodeURI(result[0].postcode)}`);

    console.log(data);
    data.map(([distance, { name, address, location }]) => {
        restaurants.push({ name, address, location });
    });

    res.status(200).send({ restaurants });
}