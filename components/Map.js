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
                <div id="Sidebar" className="w-1/4 h-screen bg-white overflow-scroll">
                    <img className="w-full h-auto p-5" src="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/101794/EatOutToHelpOut-logo-colour-English-960x640.png" />
                    <div className="m-5 font-sans font-thin">
                        <p>The Eat Out to Help Out scheme was introduced by the UK government to help restaurants with revitalising business after the UK lockdown.</p>

                        <br />
                        <p>Use the Eat Out to Help Out Scheme at a participating establishment:</p>

                        <div className="m-5">
                            <ul className="list-disc">
                                <li>to get a 50% discount on food or non-alcoholic drinks to eat or drink in (up to a maximum of £10 discount per diner)</li>
                                <li>every Monday, Tuesday and Wednesday between 3 and 31 August</li>
                                <li>as many times as you like</li>
                            </ul>
                        </div>

                        <p>

                            You do not need a voucher to use this scheme and you can use it at the same time as other offers and discounts. There is no minimum spend.
                            <br /><br />

                            You cannot claim discount on alcoholic drinks or service charges.

                            <br /><br />

                            The discount will be automatically available to you at participating establishments. Establishments will then claim a reimbursement from the government for the discount they’ve given you.

                            <br /><br />


                            Participating establishments may include:
                            <div className="m-5">
                                <ul className="list-disc">
                                    <li>restaurants, cafés, bars or pubs</li>
                                    <li>work and school canteens</li>
                                    <li>food halls</li>
                                </ul>
                            </div>

                            All diners in a group of any size can use the discount.</p>

                        <p className="mt-5 font-semibold">Created by <a href="https://github.com/HilliamT" className="text-blue-500">@HilliamT</a></p>
                    </div>
                </div>

                <Map ref={this.mapRef} center={this.state.currentLocation} minZoom={15} zoom={this.state.zoom} className="w-3/4 h-screen" onDragend={this.updateCenter.bind(this)}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {this.renderMarkers()}
                </Map>
            </div >
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