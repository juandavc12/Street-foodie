import React, { useContext } from 'react';
import LocationContext from '../context/LocationContext';

export default function ModalLocation({ closeModal }) {
  const {
    setNewPoint,
    setOpenModal,
    modalForm,
    setModalForm,
    setTitle,
    setNewPicture,
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
                onChange={(e) => setNewPicture(e.target.value)}
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
