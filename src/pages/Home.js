import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
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
            <Link to={'/map'}>
              <p>Click to view the map</p>
            </Link>
          </div>
        </div>
        <div className="TopLocationsContainer">
          <div className="TopLocations">
            <div className="TopLocationsTitle">
              <p>Recommended locations</p>
            </div>
            <div className="TopLocationsCardsContainer">
              <div className="TopLocationsCards">
                <img alt="image" src="profile_icon.png" />
                <p>Di Lucca Yo go</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="profile_icon.png" />
                <p>Di Lucca Yo go</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="profile_icon.png" />
                <p>Di Lucca Yo go</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="profile_icon.png" />
                <p>Di Lucca Yo go</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="profile_icon.png" />
                <p>Di Lucca Yo go</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
