import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
      `elements__delete ${isOwn ? 'elements__delete_visible' : ''}`
    ); 
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
      `elements__like ${isLiked ? 'elements__like_active' : ''}`
    ); 
    
    function handleClick() {
      onCardClick(card);
    }  

    function handleLikeClick() {
      onCardLike(card);
    }

    function handleDeleteClick() {
      onCardDelete(card);
    }
    
    return (
        
      <li className="elements__item">
        <img 
        className="elements__photo" 
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        />
        <button 
        className={cardDeleteButtonClassName} 
        type="button"
        onClick={handleDeleteClick}>
        </button>
        <div className="elements__description">
            <h3 className="elements__title">{card.name}</h3>
            <div className="elements__like-zone">
              <button 
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}>
              </button>
              <span className="elements__like-counter">{card.likes.length}</span>
            </div>
        </div>
      </li>
        
    );
}

export default Card;