import React, { createContext, useEffect, useState } from 'react';

const LocationContext = createContext(null);

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const value = { location };

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
