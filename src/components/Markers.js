import React, { useCallback, useEffect, useState } from 'react';
import { Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import firebaseApp from '../firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default function Markers() {
  const colRef = collection(db, 'places');
  const [places, setPlaces] = useState([]);

  const getApi = useCallback(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let placesFirebase = [];
        snapshot.docs.forEach((doc) => {
          placesFirebase.push({ ...doc.data(), id: doc.id });
        });
        setPlaces(placesFirebase);
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
        console.log(e.latlng);
        getApi();

        addDoc(colRef, {
          title: `position ${e.latlng.lat}`,
          geometry: [e.latlng.lat, e.latlng.lng],
        });
      },
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
