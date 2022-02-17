import React, { useCallback, useEffect, useState } from 'react';
import { Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import firebaseApp from '../firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default function Markers() {
  const colRef = collection(db, 'places');
  const [places, setPlaces] = useState([]);
  // const [activePoint, setActivePoint] = useState(null);

  // console.log(
  //   '🚀 ~ file: Markers.js ~ line 13 ~ Markers ~ activePoint',
  //   activePoint
  // );

  const getApi = useCallback(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let placesFirebase = [];
        snapshot.docs.forEach((doc) => {
          placesFirebase.push({ ...doc.data(), id: doc.id });
        });
        setPlaces(placesFirebase);
        // console.log(placesFirebase);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [colRef]);

  useEffect(() => {
    getApi();
  }, []);

  const GetCoords = () => {
    useMapEvents({
      click: (e) => {
        // console.log('mapCenter', e.target.getCenter());
        // console.log('map bounds', e.target.getBounds());
        console.log(e.latlng);
        getApi();

        addDoc(colRef, {
          title: `position ${e.latlng.lat}`,
          geometry: [e.latlng.lat, e.latlng.lng],
        });
      },

      // mouseover: (e) => {
      //   Marker.openPopup;
      // },
    });
    return null;
  };

  return (
    <>
      {places.map((place) => {
        return (
          <Marker key={place.id} position={place.geometry} icon={IconLocation}>
            <Tooltip>Click for details</Tooltip>
            <Popup>HI</Popup>
          </Marker>
        );
      })}
      <GetCoords />
    </>
  );
}
