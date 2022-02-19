import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import firebaseApp from '../firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import LocationContext from '../context/LocationContext';

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default function Markers() {
  const { setOpenModal, newPoint, setNewPoint, title, newPicture } =
    useContext(LocationContext);

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
        setOpenModal(true);

        if (newPoint) {
          getApi();

          addDoc(colRef, {
            placeTitle: title,
            geometry: [e.latlng.lat, e.latlng.lng],
          });

          setNewPoint(false);
          setOpenModal(false);
        }
      },
    });
    return null;
  };

  return (
    <>
      {places.map((place) => {
        return (
          <Marker key={place.id} position={place.geometry} icon={IconLocation}>
            <Tooltip>{place.placeTitle}</Tooltip>
            <Popup>HI</Popup>
          </Marker>
        );
      })}
      <GetCoords />
    </>
  );
}
