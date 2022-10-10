import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">

            <section className="profile">
              <div 
                className="profile__avatar" 
                onClick = {onEditAvatar}
                style={{ backgroundImage: `url(${currentUser.avatar})` }} 
              ></div>
              <div className="profile__info">
                <div className="profile__title">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button className="profile__edit-button" type="button" onClick = {onEditProfile}></button>
                </div>
                <p className="profile__description">{currentUser.about}</p>
              </div>
              <button className="profile__add-button" type="button" onClick = {onAddPlace}></button>
            </section>
      
            <section className="elements">
              <ul className="elements__items">
              {cards.map((card) => {
                  return (
                   <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                  );
              })}
              </ul>
            </section>

        </main>
    );
}

export default Main;