import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
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
    <>
      <div className="homeContainer">
        <div className="header">
          <div className="title">
            <span>Use</span>
            <span className="streetFoodieTitle">Street Foodie</span>
            <span>to find your best food.</span>
          </div>
          <div className="searchLocation">
            <input type={'text'} placeholder={' Search a location'} />
          </div>
        </div>
      </div>
      <h1>Geolocation</h1>
      <p>longitude: {state.longitude}</p>
      <p>latitude: {state.latitude}</p>

      <Link to={'/map'} state={state}>
        See my location
      </Link>
    </>
  );
}
