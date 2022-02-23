import React, { useContext, useEffect, useState } from 'react';

import firebaseApp from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import LocationContext from '../context/LocationContext';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function Profile() {
  const user = auth.currentUser;
  const {
    userPhotoUrl,
    country,
    newUser,
    setNewUser,
    userLoged,
    setUserLoged,
  } = useContext(LocationContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const docRef = doc(db, 'users', user.uid);

  const SetUserDatabase = async () => {
    await setDoc(docRef, {
      username: '',
      email: user.email,
      country: country,
      userPic: userPhotoUrl,
    });
    console.log('set first doc');
  };

  const getUserDatabase = async () => {
    const docSnap = await getDoc(docRef);
    const dataUser = docSnap.data();
    setNewUser(dataUser);
    console.log('Document data:', dataUser);
  };

  useEffect(() => {
    if (userLoged) {
      SetUserDatabase();
      console.log('Doc user was created already');
      setUserLoged(false);
    }
    getUserDatabase();
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
            <img alt="ProfileImg" src={newUser.userPic} />
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
