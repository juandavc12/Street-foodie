import React, { useContext } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';
import LocationContext from '../context/LocationContext';
import { MyIconLocation } from './IconLocation';
import ModalLocation from './ModalLocation';

export default function MapView() {
  const { location, openModal, setOpenModal } = useContext(LocationContext);

  const currentLocation = {
    lat: location.latitude,
    lng: location.longitude,
  };

  return (
    <>
      <div>{openModal && <ModalLocation closeModal={setOpenModal} />}</div>
      <div>
        <MapContainer center={currentLocation} zoom={15}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            key={currentLocation.lat}
            position={currentLocation}
            icon={MyIconLocation}
          >
            <Tooltip>You&apos;re here</Tooltip>
          </Marker>
          <Markers />
        </MapContainer>
      </div>
    </>
  );
}
