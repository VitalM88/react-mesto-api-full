import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, buttonSubmitText, onSubmit}) {
    return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
        <div className="popup__body">
            <button className="popup__button-close" type="button" onClick={onClose}></button>
            <form 
            className="popup__content avatarEditor-form" 
            name={`${name}-form`} 
            onSubmit={onSubmit}
            noValidate>
             <h3 className="popup__title">{title}</h3>
             
                {children}

                <button type="submit" className="popup__submit">{buttonSubmitText}</button>
            </form>
          </div>
      </div>
    );
}

export default PopupWithForm;