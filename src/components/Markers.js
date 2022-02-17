import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import firebaseApp from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default function Markers() {
  const colRef = collection(db, 'places');
  const [places, setPlaces] = useState([]);

  useEffect(async () => {
    await getDocs(colRef)
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
  }, []);

  // console.log(places);

  const markers = places.map((place) => (
    <Marker key={place.id} position={place.geometry} icon={IconLocation} />
  ));
  return markers;
}
