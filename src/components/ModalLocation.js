import React from 'react';

export default function ModalLocation({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Are you sure you want to continue?</h1>
        </div>
        <div className="body">
          <p>Add new location</p>
        </div>
        <div className="footer">
          <button id="cancelBtn" onClick={() => closeModal(false)}>
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}
