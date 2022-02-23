import React, { useContext, useEffect, useState } from 'react';

import firebaseApp from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import LocationContext from '../context/LocationContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function Profile() {
  const user = auth.currentUser;
  const { userPhotoUrl, country, newUser } = useContext(LocationContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const updateUserDatabase = async () => {
    await setDoc(doc(db, 'users', user.uid), {
      username: user.displayName,
      email: user.email,
      country: country,
      userPic: userPhotoUrl,
    });
  };

  useEffect(() => {
    updateUserDatabase();
    setName(user.displayName);
    setEmail(user.email);
    console.log(userPhotoUrl);
    console.log(user);
  }, []);

  const signout = () => {
    signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <div className="ProfileContent">
        <h1>{name}</h1>

        <div className="UserCard">
          <div className="UserPhoto">
            <img alt="ProfileImg" src={userPhotoUrl} />
          </div>
          <div className="UserInfo">
            <ul>
              <li>
                <p>Name:</p>
                <p>{name}</p>
              </li>
              <li>
                <p>Email address:</p>
                <p>{email}</p>
              </li>
              <li>
                <p>Country:</p>
                <p>{newUser.country}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="ButtonsProfile">
          <Link to={'/profile/editprofile'}>
            <button className="EditProfileButton">Edit profile</button>
          </Link>

          <button className="SignOutProfileButton" onClick={signout}>
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
