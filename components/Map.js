import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import L from 'leaflet';
import Axios from "axios";
import csv from "csvtojson";
import PostcodesIO from "postcodesio-client";
let postcodes = new PostcodesIO();

export default class MapElem extends React.Component {
    state = {
        currentLocation: [51.505, -0.09],
        restaurants: [{ latitude: 51.505, longitude: -0.09 }]
    }

    async componentDidMount() {
        L.Icon.Default.imagePath = 'img/';

        let { data } = await Axios.get("https://raw.githubusercontent.com/hmrc/eat-out-to-help-out-establishments/master/data/participating-establishments/restaurants.csv");

        let restaurants = (await csv().fromString(data)).slice(0, 20);

        restaurants = await Promise.all(restaurants.map(async (restaurant) => {
            let { latitude, longitude } = await postcodes.lookupPostcode(restaurant.Postcode);
            return { ...restaurant, latitude, longitude };
        }));

        this.setState({ restaurants });
    }

    render() {
        return (
            <div className="flex" >
                <div id="Sidebar" className="w-1/4 h-screen bg-blue-400" />

                <Map center={this.state.currentLocation} zoom={13} className="w-3/4 h-screen">
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {this.renderMarkers(this.state.restaurants)}
                </Map>
            </div>
        )
    }

    renderMarker({ latitude, longitude }) {
        return (
            <Marker position={[latitude, longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        )
    }

    renderMarkers(restaurants) {
        return restaurants.map(this.renderMarker);
    }


}