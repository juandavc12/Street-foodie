import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import firebaseApp from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(firebaseApp);

export default function NavBar() {
  const [globalUser, setGlobalUser] = useState(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setGlobalUser(firebaseUser);
    } else {
      setGlobalUser(null);
    }
  });

  return (
    <div className="navbarContainer">
      <Link to={'/'} className="logo">
        <p>Street Foodie</p>
      </Link>
      <div className="goToLocation">
        <Link to={'/map'}>
          <p>Go to my location</p>
        </Link>
      </div>

      {globalUser ? (
        <Link to={'/profile'} className="login">
          <p>Profile</p>
        </Link>
      ) : (
        <Link to={'/login'} className="login">
          <p>Log in</p>
        </Link>
      )}
    </div>
  );
}
