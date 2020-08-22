import axios from "axios";
import postcodes from "node-postcodes.io";

export default async (req, res) => {
    let { latitude, longitude } = req.body;

    let restaurants = [];

    if (latitude && longitude) {
        let { result } = await postcodes.geo(latitude, longitude);
        if (result.length == 0) return res.status(400).send({ error: "Not enough results" });

        let { data } = await axios.get(`https://www.tax.service.gov.uk/eat-out-to-help-out/find-a-restaurant/results?lookup=${encodeURI(result[0].postcode)}`);

        data.map(([distance, { name, address, location }]) => {
            restaurants.push({ name, address, location });
        });
    }


    res.status(200).send({ restaurants });
}