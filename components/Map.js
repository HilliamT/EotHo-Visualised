import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import { createRef } from "react";
import L from 'leaflet';
import Axios from "axios";

export default class MapElem extends React.Component {
    state = {
        currentLocation: [51.505, -0.09],
        restaurants: [],
        zoom: 16
    }

    mapRef = createRef()

    async componentDidMount() {
        L.Icon.Default.imagePath = 'img/';

        let [latitude, longitude] = this.state.currentLocation;
        let { restaurants } = await (await Axios.post("/api/getRestaurants", { latitude, longitude })).data;
        this.setState({ restaurants });
    }

    render() {
        return (
            <div className="flex" >
                <div id="Sidebar" className="w-1/4 h-screen bg-blue-400">

                </div>

                <Map ref={this.mapRef} center={this.state.currentLocation} minZoom={15} zoom={this.state.zoom} className="w-3/4 h-screen" onDragend={this.updateCenter.bind(this)}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {this.renderMarkers()}
                </Map>
            </div>
        )
    }

    async updateCenter() {
        const map = this.mapRef.current;
        if (map != null && map.leafletElement != null) {
            let { lat: latitude, lng: longitude } = map.leafletElement.getCenter();
            let zoom = map.leafletElement.getZoom();

            let { restaurants } = (await Axios.post("/api/getRestaurants", { latitude, longitude })).data;

            this.setState({
                currentLocation: [latitude, longitude],
                restaurants,
                zoom
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