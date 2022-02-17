import React, { useContext } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';
import LocationContext from '../context/LocationContext';
import { MyIconLocation } from './IconLocation';

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
  // console.log(
  //   '🚀 ~ file: MapView.js ~ line 30 ~ MapView ~ currentLocation',
  //   currentLocation
  // );

  // const GetCoords = () => {
  //   useMapEvents({
  //     click: (e) => {
  //       // console.log('mapCenter', e.target.getCenter());
  //       // console.log('map bounds', e.target.getBounds());
  //       console.log(e.latlng);
  //     },
  //   });
  //   return null;
  // };

  return (
    <MapContainer center={currentLocation} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <GetCoords /> */}
      <Marker
        key={currentLocation.lat}
        position={currentLocation}
        icon={MyIconLocation}
      />
      <Markers />
    </MapContainer>
  );
}
