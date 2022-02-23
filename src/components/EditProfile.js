import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationContext from '../context/LocationContext';
import firebaseApp from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export default function EditProfile() {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const docRef = doc(db, 'users', user.uid);

  const {
    setNewUser,
    userEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userPhoto,
    setUserPhoto,
    country,
    setCountry,
    setUserLoged,
  } = useContext(LocationContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  const getUserDatabase = async () => {
    const docSnap = await getDoc(docRef);
    const dataUser = docSnap.data();
    setNewUser(dataUser);
    console.log('Get data:', dataUser);
  };

  const updateNewUser = () => {
    const imageRef = ref(storage, `usersPhotos/${user.uid}_${userPhoto.name}`);

    uploadBytes(imageRef, userPhoto).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          updateDoc(docRef, {
            username: `${firstName} ${lastName}`,
            email: userEmail,
            country: country,
            userPic: url,
          });
          console.log('upload');
        })
        .then(() => {
          getUserDatabase();
        })
        .then(() => {
          navigate('/profile');
        });
    });
    setUserLoged(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNewUser();
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
