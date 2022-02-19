import React, { useContext } from 'react';
import LocationContext from '../context/LocationContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../firebase';

const storage = getStorage(firebaseApp);

export default function ModalLocation({ closeModal }) {
  const {
    setNewPoint,
    setOpenModal,
    modalForm,
    setModalForm,
    setTitle,
    setNewPicture,
    newPicture,
    setUrl,
  } = useContext(LocationContext);

  const addPoint = () => {
    setModalForm(true);
    setNewPoint(true);
  };

  const noAddNewPoint = () => {
    closeModal(false);
    setNewPoint(false);
    setModalForm(false);
  };

  const addNewPoint = () => {
    setModalForm(false);
    setNewPoint(true);
    setOpenModal(false);

    const imageRef = ref(storage, `picPlaces/${newPicture.name}`);
    uploadBytes(imageRef, newPicture)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.error(error.message, 'Error getting the image url');
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
    setNewPicture(null);
  };

  const addPicture = (e) => {
    setNewPicture(e.target.files[0]);
    setNewPoint(true);
  };

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">
            <h1>Are you sure you want to continue?</h1>
          </div>
          <div className="body">
            <p>Add new location</p>
          </div>
          <div className="footer">
            <button id="cancelBtn" onClick={noAddNewPoint}>
              Cancel
            </button>
            <button onClick={addPoint}>Continue</button>
          </div>
        </div>
      </div>
      {modalForm && (
        <div className="modalBackgroundForm">
          <div className="modalContainer">
            <div className="title">
              <h1>Modal Form</h1>
            </div>
            <div className="body">
              <p>Modal Form</p>
            </div>
            <div>
              <input
                placeholder="Title place"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                placeholder="Subir imagen"
                type="file"
                onChange={addPicture}
              />
            </div>
            <div className="footer">
              <button id="cancelBtn" onClick={noAddNewPoint}>
                Cancel
              </button>
              <button onClick={addNewPoint}>Locate point</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
