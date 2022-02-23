import React, { useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationContext from '../context/LocationContext';
import firebaseApp from '../firebase';
// import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export default function EditProfile() {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const docRef = doc(db, 'users', user.uid);

  const {
    setNewUser,
    setUserEmail,
    userEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userPhoto,
    setUserPhoto,
    setUserPhotoUrl,
    userPhotoUrl,
    country,
    setCountry,
  } = useContext(LocationContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  const updateUserEmail = useCallback(() => {
    updateEmail(user, userEmail)
      .then(() => {
        console.log('Email updated');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const updateUser = useCallback(() => {
    updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: userPhotoUrl,
    })
      .then(() => {
        console.log('User updated');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const updateDocUser = useCallback(() => {
    updateDoc(docRef, {
      username: `${firstName} ${lastName}`,
      email: userEmail,
      country: country,
      userPic: userPhotoUrl,
    });
  });

  const getUserDatabase = async () => {
    const docSnap = await getDoc(docRef);
    const dataUser = docSnap.data();
    setNewUser(dataUser);
    console.log('Document data:', dataUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `usersPhotos/${user.uid}_${userPhoto.name}`);
    function uploadPhoto(callback) {
      uploadBytes(imageRef, userPhoto).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            e.target.reset();
            setUserPhotoUrl(url);
            console.log(url);
            console.log('upload');
          })
          .then(() => {
            updateUserEmail();
          })
          .then(() => {
            updateUser();
          })
          .then(() => {
            updateDocUser();
          })
          .then(() => {
            getUserDatabase();
          })
          .then(() => {
            navigate('/profile');
          });
      });
      console.log('este despues');
      callback();
    }

    function getPhoto() {
      updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        photoURL: { setUserPhotoUrl },
      });
      console.log(firstName);
      console.log(lastName);
      console.log(country);

      console.log('Este primero');
      uploadPhoto();
    }

    getPhoto();
  };

  const addUserPhoto = (e) => {
    setUserPhoto(e.target.files[0]);
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
            <div className="Email">
              <input
                placeholder="Country"
                type="text"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
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
