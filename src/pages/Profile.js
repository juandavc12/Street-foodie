import React, { useCallback, useContext, useEffect, useState } from 'react';

import firebaseApp from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import LocationContext from '../context/LocationContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function Profile() {
  const { userEmail, firstName, lastName, UserPhotoUrl } =
    useContext(LocationContext);

  const [users, setUsers] = useState([]);

  const colRef = collection(db, 'users');

  const getApi = useCallback(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let usersFirebase = [];
        snapshot.docs.forEach((doc) => {
          usersFirebase.push({ ...doc.data(), id: doc.id });
          console.log(doc.id);
        });
        setUsers(usersFirebase);
        console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [colRef]);

  useEffect(() => {
    getApi();
    console.groupEnd(users);
  }, []);

  useEffect(() => {
    console.log(userEmail);
    console.log(firstName);
    console.log(lastName);
    console.log(UserPhotoUrl);
  }, []);

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
