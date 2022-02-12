import React from 'react';
import { Marker } from 'react-leaflet';
import { IconLocation } from './IconLocation';

export default function Markers() {
  return <Marker position={['52.52437', '13.41053']} icon={IconLocation} />;
}
