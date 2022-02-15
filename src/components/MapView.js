import React, { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';
import places from '../assets/data.json';
import LocationContext from '../context/LocationContext';

export default function MapView() {
  // const [state, setState] = useState({
  //   currentLocation: { lat: 52.52437, lng: 13.41053 },
  //   zoom: 13,
  // });
  const { location } = useContext(LocationContext);

  // useEffect(() => {
  //   const currentLocation = {
  //     lat: location.latitude,
  //     lng: location.longitude,
  //   };
  //   setState({ ...state, currentLocation });
  // }, []);

  // console.log(state);

  const currentLocation = {
    lat: location.latitude,
    lng: location.longitude,
  };
  console.log(
    '🚀 ~ file: MapView.js ~ line 30 ~ MapView ~ currentLocation',
    currentLocation
  );

  return (
    <MapContainer center={currentLocation} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers places={places.places} />
    </MapContainer>
  );
}
