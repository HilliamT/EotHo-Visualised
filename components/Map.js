import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import L from 'leaflet'

export default class MapElem extends React.Component {
    state = {
        currentLocation: [51.505, -0.09],
        restaurants: [{ latitude: 51.505, longitude: -0.09 }]
    }

    async componentDidMount() {
        L.Icon.Default.imagePath = 'img/';
    }

    render() {
        return (
            <div className="flex">
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