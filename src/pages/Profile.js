import React, { useEffect, useState } from 'react';

import firebaseApp from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function Profile() {
  const [dataApi, setDataApi] = useState({});

  const getApiDoc = async () => {
    const colRef = doc(db, 'users', 'myID');
    const docSnap = await getDoc(colRef);

    if (docSnap.exists()) {
      setDataApi(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  console.log(dataApi.firstName);

  useEffect(() => {
    getApiDoc();
  }, []);

  return (
    <>
      <div className="ProfileContent">
        <h1>{`${dataApi.firstName} ${dataApi.lastName}`}</h1>

        <div className="UserCard">
          <div className="UserPhoto">
            <img alt="ProfileImg" src="profile_icon.png" />
          </div>
          <div className="UserInfo">
            <ul>
              <li>
                <p>Name:</p>
                <p>{`${dataApi.firstName} ${dataApi.lastName}`}</p>
              </li>
              <li>
                <p>Email address:</p>
                <p>{dataApi.userEmail}</p>
              </li>
              <li>
                <p>Country:</p>
                <p>{dataApi.country}</p>
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
