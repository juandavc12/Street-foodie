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
  const { userPhotoUrl, country, newUser, userLoged, setUserLoged } =
    useContext(LocationContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const SetUserDatabase = async () => {
    await setDoc(doc(db, 'users', user.uid), {
      username: '',
      email: user.email,
      country: country,
      userPic: userPhotoUrl,
    });
  };

  useEffect(() => {
    if (userLoged) {
      SetUserDatabase();
      console.log('Doc user was created already');
      setUserLoged(false);
    }
    SetUserDatabase();
    setEmail(user.email);
    console.log(newUser);
  }, []);

  const signout = () => {
    signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <div className="ProfileContent">
        <h1>{newUser.username}</h1>

        <div className="UserCard">
          <div className="UserPhoto">
            <img alt="ProfileImg" src={userPhotoUrl} />
          </div>
          <div className="UserInfo">
            <ul>
              <li>
                <p>Name:</p>
                <p>{newUser.username}</p>
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
