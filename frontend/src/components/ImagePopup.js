import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_open-photo ${card.link && 'popup_is-opened'}`}>
      <div className="popup__photo-body">
        <button 
          className="popup__button-close" 
          type="button"
          onClick={onClose}
        >
        </button>
        <img 
          className="popup__photo" 
          src={`${card.link}`} 
          alt={`${card.name}`}
        />
        <p className="popup__photo-description">{card.name}</p>
      </div>
    </div> 
  );
}

export default ImagePopup;