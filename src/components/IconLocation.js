import L from 'leaflet';

export const IconLocation = L.icon({
  iconUrl: require('../assets/iconPosition.png'),
  iconRetinaUrl: require('../assets/iconPosition.png'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [20, 35],
  className: 'leaflet-venue-icon',
});

export const MyIconLocation = L.icon({
  iconUrl: require('../assets/myIconPosition.png'),
  iconRetinaUrl: require('../assets/myIconPosition.png'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [18, 30],
  className: 'leaflet-venue-icon',
});
