import React from 'react';

import firebaseApp from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
const auth = getAuth(firebaseApp);

export default function Profile() {
  return (
    <>
      <div className="ProfileContent">
        <h1>User name</h1>

        <div className="UserCard">
          <div className="UserPhoto">
            <img alt="ProfileImg" src="profile_icon.png" />
          </div>
          <div className="UserInfo">
            <ul>
              <li>
                <p>Name:</p>
                <p>Pedro Pepino Papas</p>
              </li>
              <li>
                <p>Email address:</p>
                <p>juandavc12@test.test</p>
              </li>
              <li>
                <p>Country:</p>
                <p>Colombia</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="ButtonsProfile">
          <Link to={'/profile/editprofile'}>
            <button className="EditProfileButton">Edit profile</button>
          </Link>

          <button
            className="SignOutProfileButton"
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
