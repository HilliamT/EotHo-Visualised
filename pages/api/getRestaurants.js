
import csv from "csvtojson";
import request from "request";

export default (req, res) => {
    csv()
        .fromStream(request.get("https://raw.githubusercontent.com/hmrc/eat-out-to-help-out-establishments/master/data/participating-establishments/restaurants.csv"))
        .subscribe((json) => {
            res.status(200).send(json);
        }).catch((err) => {
            res.status(400).send(err)
        })
}