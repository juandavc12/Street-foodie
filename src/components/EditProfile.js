import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocationContext from '../context/LocationContext';
import firebaseApp from '../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default function EditProfile() {
  const {
    userEmail,
    setUserEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userPhoto,
    setUserPhoto,
    setUserPhotoUrl,
  } = useContext(LocationContext);

  const colRef = collection(db, 'users');

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `usersPhotos/${firstName}_${userPhoto.name}`);
    function uploadPhoto(callback) {
      uploadBytes(imageRef, userPhoto).then(() => {
        getDownloadURL(imageRef).then((url) => {
          addDoc(colRef, {
            firstName,
            lastName,
            userEmail,
            userPhotoUrl: { url },
          });
          e.target.reset();
          setUserPhotoUrl(url);
        });
      });
      callback();
    }

    function getPhoto() {
      getDownloadURL(imageRef).then((url) => {
        setUserPhotoUrl(url);
        console.log(url);
      });
      uploadPhoto();
    }

    getPhoto();
  };

  const addUserPhoto = (e) => {
    setUserPhoto(e.target.files[0]);
    // console.log(userPhoto);
  };

  return (
    <>
      <div className="EditProfileContent">
        <h1>Edit Profile</h1>
        <div className="EditProfileCard">
          <form className="EditProfileForm" onSubmit={handleSubmit}>
            <div className="FullName">
              <input
                placeholder="Fist name"
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Last name"
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="Email">
              <input
                placeholder="Email"
                type="text"
                id="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="UploadContainer">
              <label className="UploadProfilePhoto">
                Upload a photo
                <input
                  placeholder="Upload image"
                  type="file"
                  onChange={addUserPhoto}
                />
              </label>
            </div>
            <button type="submit">Upload profile</button>
          </form>

          <Link to={'/profile'}>
            <button type="submit">Back to profile</button>
          </Link>
        </div>
      </div>
    </>
  );
}
