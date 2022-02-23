import React, { createContext, useEffect, useState } from 'react';

const LocationContext = createContext(null);

const LocationProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [newPoint, setNewPoint] = useState(false);
  const [modalForm, setModalForm] = useState(false);
  const [title, setTitle] = useState('');
  const [newPicture, setNewPicture] = useState(null);
  const [url, setUrl] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState('profile_icon.png');
  const [country, setCountry] = useState('');
  const [userLoged, setUserLoged] = useState(true);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    country: '',
    userPic: userPhotoUrl,
  });

  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const value = {
    location,
    openModal,
    setOpenModal,
    newPoint,
    setNewPoint,
    modalForm,
    setModalForm,
    title,
    setTitle,
    newPicture,
    setNewPicture,
    url,
    setUrl,
    userEmail,
    setUserEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userPhoto,
    setUserPhoto,
    userPhotoUrl,
    setUserPhotoUrl,
    country,
    setCountry,
    newUser,
    setNewUser,
    userLoged,
    setUserLoged,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider };
export default LocationContext;
