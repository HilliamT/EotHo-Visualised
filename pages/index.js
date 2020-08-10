import dynamic from 'next/dynamic';
const MapElem = dynamic(() => import('../components/Map'), {
    ssr: false
});

export default class Home extends React.Component {
    render() {
        return (<MapElem />);
    }
}