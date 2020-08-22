import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import { createRef } from "react";
import L from 'leaflet';
import Axios from "axios";

export default class MapElem extends React.Component {
    state = {
        currentLocation: [51.505, -0.09],
        restaurants: []
    }

    mapRef = createRef()

    async componentDidMount() {
        L.Icon.Default.imagePath = 'img/';

        let { restaurants } = await (await Axios.get("/api/getRestaurants")).data;
        this.setState({ restaurants });
    }

    render() {
        return (
            <div className="flex" >
                <div id="Sidebar" className="w-1/4 h-screen bg-blue-400">

                </div>

                <Map ref={this.mapRef} center={this.state.currentLocation} zoom={13} className="w-3/4 h-screen" onDragend={this.updateCenter.bind(this)}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {this.renderMarkers()}
                </Map>
            </div>
        )
    }

    updateCenter() {
        const map = this.mapRef.current;
        if (map != null && map.leafletElement != null) {
            console.log(map.leafletElement.getCenter());
            let { lat, lng } = map.leafletElement.getCenter();
            this.setState({
                center: [lat, lng],
            })
        }
    }


    renderMarker({ name, address, location }) {
        let { line1, town, postCode } = address;

        let search_url = `http://www.google.com/search?q=${encodeURI(name + " " + postCode)}`;

        return (
            <Marker position={location}>
                <Popup>
                    <span className="font-bold">{name}</span> <a href={search_url} target="_blank">Search</a>
                    <br />
                    {line1}<br />
                    {postCode} {town}
                </Popup>
            </Marker>
        )
    }

    renderMarkers() {
        return this.state.restaurants.map(this.renderMarker);
    }


}