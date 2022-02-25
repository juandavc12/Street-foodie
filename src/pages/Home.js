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
                <img
                  alt="image"
                  src="classic-buffalo-wings-horizontal-279-1547506077.jpg"
                />
                <p>Wings fast</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="Breakfast_burritos.jpg" />
                <p>Burritos el pastorcito</p>
              </div>
              <div className="TopLocationsCards">
                <img
                  alt="image"
                  src="deliciosa-comida-rapida-estilo-pop-art_24908-61615.jpg"
                />
                <p>Comiclon</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="donuts-colores-m.jpg" />
                <p>Donut Telo</p>
              </div>
              <div className="TopLocationsCards">
                <img alt="image" src="hamburguesas.jpg" />
                <p>Hamburgry</p>
              </div>
            </div>
          </div>
        </div>
        <div className="InstructionsContainer">
          <div className="Instructions">
            <div className="InstructionsTitle">
              <span>Find the best food point with</span>
              <h1>Street Foodie!</h1>
            </div>
            <div className="InstructionsCardsContainer">
              <div className="InstructionsCard">
                <img alt="FirstInstruction" src="Location.png" />
                <h4>Acces to the map</h4>
                <p>You will see the meal markers on the map.</p>
              </div>
              <div className="InstructionsCard">
                <img alt="FirstInstruction" src="CurrentLocation.png" />
                <h4>Location</h4>
                <p>Access your location or another location.</p>
              </div>
              <div className="InstructionsCard">
                <img alt="FirstInstruction" src="Food.png" />
                <h4>Find a food point!</h4>
                <p>Find the food you want.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
