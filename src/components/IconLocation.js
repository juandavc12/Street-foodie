import L from 'leaflet';

export const IconLocation = L.icon({
  iconUrl: require('../assets/iconPosition.png'),
  iconRetinaUrl: require('../assets/iconPosition.png'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 40],
  className: 'leaflet-venue-icon',
});
