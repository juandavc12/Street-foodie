import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import { IconLocation } from './IconLocation';
import firebaseApp from '../firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import LocationContext from '../context/LocationContext';

const db = getFirestore(firebaseApp);

export default function Markers() {
  const {
    setOpenModal,
    newPoint,
    setNewPoint,
    title,
    newPicture,
    setNewPicture,
    url,
  } = useContext(LocationContext);

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
        getApi();

        if (newPoint) {
          addDoc(colRef, {
            placeTitle: title,
            geometry: [e.latlng.lat, e.latlng.lng],
            picPlace: { url },
          });

          setNewPoint(false);
          setOpenModal(false);
        } else {
          setOpenModal(true);
          setNewPicture(newPicture);
        }
      },
    });
    return null;
  };
  // console.log(addDoc);

  const PlaceMarker = () =>
    places.map((place) => {
      return (
        <Marker key={place.id} position={place.geometry} icon={IconLocation}>
          <Tooltip>
            <p>{place.placeTitle}</p>
          </Tooltip>
          <Popup>
            <img
              alt={place.placeTitle}
              src={place.picPlace.url}
              className="imgPopup"
            />
            <p>{place.placeTitle}</p>
          </Popup>
        </Marker>
      );
    });

  return (
    <>
      <PlaceMarker />
      <GetCoords />
    </>
  );
}
