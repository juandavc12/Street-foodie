import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';
import places from '../assets/data.json';
import { useLocation } from 'react-router-dom';

export default function MapView() {
  const [state, setState] = useState({
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 13,
  });

  const location = useLocation();
  // console.log('🚀 ~ file: MapView.js ~ line 15 ~ MapView ~ location', location);
  // console.log(parseFloat(location.state.longitude));

  useEffect(() => {
    if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      setState({ ...state, currentLocation });
    }
  }, []);
  console.log(state);
  // console.log(location);
  // console.log(state.currentLocation);

  return (
    <MapContainer center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers places={places.places} />
    </MapContainer>
  );
}
