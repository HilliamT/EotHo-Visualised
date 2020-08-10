import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import L from 'leaflet'

export default class MapElem extends React.Component {

    async componentDidMount() {
        L.Icon.Default.imagePath = 'img/';
    }

    render() {
        return (<Map center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
            </Marker>
        </Map>)
    }


}