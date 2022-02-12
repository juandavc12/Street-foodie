import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="navbarContainer">
      <Link to={'/'} className="logo">
        <p>Street Foodie</p>
      </Link>
      <div className="goToLocation">
        <Link to={'/mapview'}>
          <p>Go to my location</p>
        </Link>
        <input type={'text'} placeholder={'Search a location'} />
        <button type="button">
          <img alt="search" src="search.png" />
        </button>
      </div>
      <Link to={'/login'} className="login">
        <p>Log in</p>
      </Link>
    </div>
  );
}
