import React from 'react';

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
            <input type={'text'} placeholder={' Search a location'} />
          </div>
        </div>
      </div>
    </>
  );
}
