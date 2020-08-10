import dynamic from 'next/dynamic';
const MapElem = dynamic(() => import('../components/Map'), {});

export default class Home extends React.Component {
    render() {
        return (<MapElem />);
    }
}