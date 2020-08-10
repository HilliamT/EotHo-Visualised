import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import L from 'leaflet';
import Axios from "axios";



export default class MapElem extends React.Component {
    state = {
        currentLocation: [51.505, -0.09],
        restaurants: [{ latitude: 51.505, longitude: -0.09 }]
    }

    async componentDidMount() {
        L.Icon.Default.imagePath = 'img/';

        let { data } = await Axios.get("/api/getRestaurants");

        this.setState({ restaurants: data });
    }

    render() {
        return (
            <div className="flex" >
                <div id="Sidebar" className="w-1/4 h-screen bg-blue-400">

                </div>

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

    renderMarker(restaurant) {
        let { Name, latitude, longitude, Postcode, Town, County } = restaurant;
        let line1 = restaurant["Line 1"];
        let line2 = restaurant["Line 2"];

        let search_url = `http://www.google.com/search?q=${encodeURI(Name + " " + Postcode)}`;

        return (
            <Marker position={[latitude, longitude]}>
                <Popup>
                    <span className="font-bold">{Name}</span> <a href={search_url} target="_blank">Search</a>
                    <br />
                    {line1}{line2 != "" && `, ${line2}`}<br />
                    {Postcode} {Town}, {County}
                </Popup>
            </Marker>
        )
    }

    renderMarkers(restaurants) {
        return restaurants.map(this.renderMarker);
    }


}